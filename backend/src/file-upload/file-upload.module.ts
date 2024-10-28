import { Module } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileUploadController } from './file-upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '../..', 'uploads'),
            serveRoot: '/uploads'
        }),
        MulterModule.register({
            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, cb) => {
                    const filename = `${Date.now()}-${file.originalname}`;
                    cb(null, filename);
                }
            })
        })
    ],
    controllers: [FileUploadController],
    providers: [FileUploadService]
})
export class FileUploadModule {}
