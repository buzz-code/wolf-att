import { CallBase } from "../../common-modules/server/utils/callBase";
import format from 'string-format';
import * as queryHelper from './queryHelper';
import AttReport from "../models/att-report.model";

export class YemotCall extends CallBase {
    constructor(params, callId, user) {
        super(params, callId, user);
    }

    texts = {
        phoneIsNotRecognizedInTheSystem: 'מספר הטלפון אינו רשום במערכת',
        welcomeAndTypeKlassId: 'שלום המורה {0} הגעת למוקד רישום הנוכחות, נא הקישי את קוד הכיתה',
        confirmKlass: 'כיתה {0}, לאישור הקישי 1, לתיקון הקישי 2',
        klassIdNotFound: 'קוד כיתה לא נמצא',
        tryAgain: 'נסי שנית',
        typeLessonId: 'נא הקישי את קוד השיעור',
        confirmLesson: 'שיעור {0}, לאישור הקישי 1, לתיקון הקישי 2',
        lessonIdNotFound: 'קוד שיעור לא נמצא',
        startStudentList: 'כעת תושמע רשימת התלמידות',
        typeAbsences: 'הקישי את מספר החיסורים לתלמידה',
        typeApprovedAbsences: 'הקישי את מספר החיסורים המאושרים לתלמידה',
        // prevStudent: 'מעבר לתלמידה הקודמת',
        // forAttendanceTypeXPressY: 'ל{0} הקישי {1}, ',
        dataWasNotSaved: 'ארעה שגיאה, נסי שוב במועד מאוחר יותר',
        dataWasSavedSuccessfully: 'רישום הנוכחות הסתיים בהצלחה',
    }

    async start() {
        await this.getTexts();
        try {
            const teacher = await queryHelper.getTeacherByUserIdAndPhone(this.user.id, this.params.ApiPhone);
            if (!teacher) {
                await this.send(
                    this.id_list_message({ type: 'text', text: this.texts.phoneIsNotRecognizedInTheSystem }),
                    this.hangup()
                );
            }
            const klass = await this.getKlass(teacher);
            const lesson = await this.getLesson();
            await this.getStudentReports(klass);
            try {
                const baseReport = {
                    user_id: this.user.id,
                    teacher_id: teacher.id,
                    lesson_id: lesson.id,
                    report_date: new Date().toISOString().substr(0, 10),
                };
                for (const studentId in this.params.studentReports) {
                    const attReport = {
                        ...baseReport,
                        student_tz: studentId,
                        abs_count: this.params.studentReports[studentId].abs_count,
                        approved_abs_count: this.params.studentReports[studentId].approved_abs_count,
                        comments: '',
                    };
                    await new AttReport(attReport).save();
                }
                await this.send(
                    this.id_list_message({ type: 'text', text: this.texts.dataWasSavedSuccessfully }),
                    this.hangup()
                );
            }
            catch (e) {
                console.log('catch yemot exception', e);
                await this.send(
                    this.id_list_message({ type: 'text', text: this.texts.dataWasNotSaved }),
                    this.hangup()
                );
            }
        }
        catch (e) {
            if (e) {
                console.log('catch yemot exception', e);
            }
        } finally {
            this.end();
        }
    }

    async getKlass(teacher, isRetry = false) {
        const message = isRetry ? this.texts.tryAgain : format(this.texts.welcomeAndTypeKlassId, teacher.name);
        await this.send(
            this.read({ type: 'text', text: message },
                'klassId', 'tap', { max: 9, min: 1, block_asterisk: true })
        );
        let klass = await queryHelper.getKlassByUserIdAndKlassId(this.user.id, this.params.klassId);
        if (klass) {
            await this.send(
                this.read({ type: 'text', text: format(this.texts.confirmKlass, klass.name) },
                    'klassConfirm', 'tap', { max: 1, min: 1, block_asterisk: true })
            );
            if (this.params.klassConfirm === '2') {
                return this.getKlass(teacher, true);
            }
        } else {
            await this.send(this.id_list_message({ type: 'text', text: this.texts.klassIdNotFound }));
            return this.getKlass(teacher, true);
        }
        return klass;
    }

    async getLesson(isRetry = false) {
        const message = isRetry ? this.texts.tryAgain : this.texts.typeLessonId;
        await this.send(
            this.read({ type: 'text', text: message },
                'lessonId', 'tap', { max: 9, min: 1, block_asterisk: true })
        );
        let lesson = await queryHelper.getLessonByUserIdAndLessonId(this.user.id, this.params.lessonId);
        if (lesson) {
            await this.send(
                this.read({ type: 'text', text: format(this.texts.confirmLesson, lesson.name) },
                    'lessonConfirm', 'tap', { max: 1, min: 1, block_asterisk: true })
            );
            if (this.params.lessonConfirm === '2') {
                return this.getLesson(true);
            }
        } else {
            await this.send(this.id_list_message({ type: 'text', text: this.texts.lessonIdNotFound }));
            return this.getLesson(true);
        }
        return lesson;
    }

    async getStudentReports(klass) {
        const students = await queryHelper.getStudentsByUserIdAndKlassId(this.user.id, klass.key);

        let isFirstTime = true;
        this.params.studentReports = {};
        for (let index = 0; index < students.length; index++) {
            const student = students[index];
            await this.send(
                isFirstTime ? this.id_list_message({ type: 'text', text: this.texts.startStudentList }) : undefined,
                this.read({ type: 'text', text: student.name + ': ' + this.texts.typeAbsences },
                    'absCount', 'tap', { max: 9, min: 1, block_asterisk: true })
            );
            await this.send(
                isFirstTime ? this.id_list_message({ type: 'text', text: this.texts.startStudentList }) : undefined,
                this.read({ type: 'text', text: this.texts.typeApprovedAbsences },
                    'approvedAbsCount', 'tap', { max: 9, min: 1, block_asterisk: true })
            );

            isFirstTime = false;
            this.params.studentReports[student.tz] = {
                abs_count: this.params.absCount,
                approved_abs_count: this.params.approvedAbsCount,
            };
        }
    }
}