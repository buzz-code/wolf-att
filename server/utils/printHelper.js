import fs from 'fs';
import path from 'path';
import archiver from 'archiver';
import temp from 'temp';
import { getFileName, getPdfStreamFromHtml, renderEjsTemplate } from '../../common-modules/server/utils/template';
import { getDiaryDataByGroupId } from './queryHelper';
import constant from '../../common-modules/server/config/directory';

temp.track();

const templatesDir = path.join(__dirname, '..', '..', 'public', 'templates');

const getFilenameFromGroup = ({ klass, teacher, lesson }) => `יומן נוכחות ${klass?.name || ''}_${teacher?.name || ''}_${lesson?.name || ''}`;

const addMetadataToTemplateData = async (templateData, title) => {
    templateData.title = title;
    templateData.font = 'data:font/truetype;base64,' + await fs.promises.readFile(path.join(constant.assetsDir, 'fonts', 'ELEGANTIBOLD.TTF'), { encoding: 'base64' });
    templateData.img = 'data:image;base64,' + await fs.promises.readFile(path.join(constant.assetsDir, 'img', 'header.jpg'), { encoding: 'base64' });
}

export async function getDiaryStream(groupId) {
    const templatePath = path.join(templatesDir, "diary.ejs");
    const templateData = await getDiaryDataByGroupId(groupId);
    await addMetadataToTemplateData(templateData, 'יומן נוכחות');
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
