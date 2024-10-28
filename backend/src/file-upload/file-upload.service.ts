import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFileUploadDto } from './dto/create-file-upload.dto';
import { UpdateFileUploadDto } from './dto/update-file-upload.dto';

@Injectable()
export class FileUploadService {
    handleFileUpload(file: Express.Multer.File) {
        if (!file) {
            throw new BadRequestException('no file uploaded');
        }
        const maxSize = 100 * 1024 * 1024;
        if (file.size > maxSize) {
            throw new BadRequestException('file is too large!');
        }

        return { message: 'File uploaded successfully', filePath: file.path };
    }
    create(createFileUploadDto: CreateFileUploadDto) {
        return 'This action adds a new fileUpload';
    }

    findAll() {
        return `This action returns all fileUpload`;
    }

    findOne(id: number) {
        return `This action returns a #${id} fileUpload`;
    }

    update(id: number, updateFileUploadDto: UpdateFileUploadDto) {
        return `This action updates a #${id} fileUpload`;
    }

    remove(id: number) {
        return `This action removes a #${id} fileUpload`;
    }
}
