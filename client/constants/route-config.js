import DashboardIcon from '@material-ui/icons/Dashboard';
import ListAltIcon from '@material-ui/icons/ListAlt';
import PeopleIcon from '@material-ui/icons/People';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import ListIcon from '@material-ui/icons/List';
import GroupIcon from '@material-ui/icons/Group';
import ChatIcon from '@material-ui/icons/Chat';
import AssignmentIcon from '@material-ui/icons/Assignment';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import FormatListNumberedRtlIcon from '@material-ui/icons/FormatListNumberedRtl';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import EventNoteIcon from '@material-ui/icons/EventNote';
import MenuIcon from '@material-ui/icons/Menu';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import PrintIcon from '@material-ui/icons/Print';
import GroupWorkIcon from '@material-ui/icons/GroupWork';

import * as entities from './entity';
import * as titles from './entity-title';

import Dashboard from '../containers/dashboard/DashboardContainer';
import Teachers from '../containers/teachers/TeachersContainer';
import Students from '../containers/students/StudentsContainer';
import Lessons from '../containers/lessons/LessonsContainer';
import Klasses from '../containers/klasses/KlassesContainer';
import StudentKlasses from '../containers/student-klasses/StudentKlassesContainer';
import Groups from '../containers/groups/GroupsContainer';
import AttTypes from '../containers/att-types/AttTypesContainer';
import KlassTypes from '../containers/klass-types/KlassTypesContainer';
import AttReports from '../containers/att-reports/AttReportsContainer';
import StudentKlassesKlassType from '../containers/student-klasses-klass-type/StudentKlassesKlassTypeContainer';
import ReportEdit from '../containers/report-edit/ReportEditContainer';
import GroupsPrint from '../containers/groups-print/GroupsPrintContainer';
import ExcelImport from '../containers/excel-import/ExcelImportContainer';

export default [
  [
    {
      path: '/dashboard',
      component: Dashboard,
      icon: DashboardIcon,
      title: titles.DASHBOARD,
      props: { entity: entities.DASHBOARD, title: titles.DASHBOARD },
    },
    {
      path: '/teachers',
      component: Teachers,
      icon: SupervisedUserCircleIcon,
      title: titles.TEACHERS,
      props: { entity: entities.TEACHERS, title: titles.TEACHERS },
    },
    {
      path: '/students',
      component: Students,
      icon: PeopleIcon,
      title: titles.STUDENTS,
      props: { entity: entities.STUDENTS, title: titles.STUDENTS },
    },
    {
      path: '/lessons',
      component: Lessons,
      icon: EventNoteIcon,
      title: titles.LESSONS,
      props: { entity: entities.LESSONS, title: titles.LESSONS },
    },
    {
      path: '/klasses',
      component: Klasses,
      icon: GroupIcon,
      title: titles.KLASSS,
      props: { entity: entities.KLASSS, title: titles.KLASSS },
    },
    {
      path: '/student-klasses',
      component: StudentKlasses,
      icon: GroupWorkIcon,
      title: titles.STUDENT_KLASSES,
      props: { entity: entities.STUDENT_KLASSES, title: titles.STUDENT_KLASSES },
    },
    {
      path: '/groups',
      component: Groups,
      icon: GroupAddIcon,
      title: titles.GROUPS,
      props: { entity: entities.GROUPS, title: titles.GROUPS },
    },
    {
      path: '/att-types',
      component: AttTypes,
      icon: MenuIcon,
      title: titles.ATT_TYPES,
      props: { entity: entities.ATT_TYPES, title: titles.ATT_TYPES },
    },
    {
      path: '/klass-types',
      component: KlassTypes,
      icon: MenuIcon,
      title: titles.KLASS_TYPES,
      props: { entity: entities.KLASS_TYPES, title: titles.KLASS_TYPES },
    },
    {
      path: '/att-reports',
      component: AttReports,
      icon: AssignmentTurnedInIcon,
      title: titles.ATT_REPORTS,
      props: { entity: entities.ATT_REPORTS, title: titles.ATT_REPORTS },
    },
  ],
  [
    { path: '/excel-import', component: ExcelImport, icon: FileCopyIcon, title: 'העלאת קבצים' },
    {
      path: '/groups-print',
      component: GroupsPrint,
      icon: PrintIcon,
      title: titles.GROUPS_PRINT,
      props: { entity: entities.GROUPS, title: titles.GROUPS_PRINT },
    },
    {
      path: '/student-klasses-klass-type',
      component: StudentKlassesKlassType,
      icon: GroupWorkIcon,
      title: titles.STUDENT_KLASSES_KLASS_TYPE,
      props: { entity: entities.STUDENT_KLASSES_KLASS_TYPE, title: titles.STUDENT_KLASSES_KLASS_TYPE },
    },
    {
      path: '/report-edit',
      component: ReportEdit,
      icon: AssignmentIcon,
      title: titles.REPORT_EDIT,
      props: { entity: entities.REPORT_EDIT, title: titles.REPORT_EDIT },
    },
  ],
  // [
  //   {
  //     path: '/student-reports',
  //     component: StudentReports,
  //     icon: AssignmentIcon,
  //     title: titles.STUDENT_REPORTS,
  //     props: { entity: entities.STUDENT_REPORTS, title: titles.STUDENT_REPORTS },
  //   },
  //   {
  //     path: '/teacher-reports',
  //     component: TeacherReports,
  //     icon: AssignmentIcon,
  //     title: titles.TEACHER_REPORTS,
  //     props: { entity: entities.TEACHER_REPORTS, title: titles.TEACHER_REPORTS },
  //   },
  //   {
  //     path: '/organization-reports',
  //     component: OrganizationReports,
  //     icon: AssignmentIcon,
  //     title: titles.ORGANIATION_REPORTS,
  //     props: { entity: entities.ORGANIATION_REPORTS, title: titles.ORGANIATION_REPORTS },
  //   },
  //   {
  //     path: '/daily-reports',
  //     component: DailyReports,
  //     icon: AssignmentIcon,
  //     title: titles.DAILY_REPORTS,
  //     props: { entity: entities.DAILY_REPORTS, title: titles.DAILY_REPORTS },
  //   },
  //   {
  //     path: '/monthly-reports',
  //     component: MonthlyReports,
  //     icon: AssignmentIcon,
  //     title: titles.MONTHLY_REPORTS,
  //     props: { entity: entities.MONTHLY_REPORTS, title: titles.MONTHLY_REPORTS },
  //   },
  // ],
];
