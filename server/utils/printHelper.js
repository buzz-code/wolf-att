import fs from 'fs';
import path from 'path';
import archiver from 'archiver';
import temp from 'temp';
import { getFileName, getPdfStreamFromHtml, renderEjsTemplate } from '../../common-modules/server/utils/template';
import { getDiaryDataByGroupId } from './queryHelper';

temp.track();

const templatesDir = path.join(__dirname, '..', '..', 'public', 'templates');

const getFilenameFromGroup = ({ klass, teacher, lesson }) => `יומן נוכחות ${klass?.name || ''}_${teacher?.name || ''}_${lesson?.name || ''}`;

export async function getDiaryStream(groupId) {
    const templatePath = path.join(templatesDir, "diary.ejs");
    const templateData = await getDiaryDataByGroupId(groupId);
    const html = await renderEjsTemplate(templatePath, templateData);
    const fileStream = await getPdfStreamFromHtml(html);
    const filename = getFilenameFromGroup(templateData.group);
    return { fileStream, filename };
}

export async function getDiaryZipStream(groups) {
    const archive = archiver('zip');
    var tempStream = temp.createWriteStream({ suffix: '.zip' });
    archive.pipe(tempStream);

    for await (const group of groups) {
        const { fileStream, filename } = await getDiaryStream(group.id);
        archive.append(fileStream, { name: getFileName(filename, 'pdf') });
    }
    await archive.finalize();
    tempStream.close();
    return { fileStream: fs.createReadStream(tempStream.path), filename: 'יומנים' };
}
