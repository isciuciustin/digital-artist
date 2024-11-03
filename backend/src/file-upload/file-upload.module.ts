import { Module } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileUploadController } from './file-upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/auth.guard';

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
    providers: [
        FileUploadService,
        {
            provide: APP_GUARD,
            useClass: AuthGuard
        }
    ]
})
export class FileUploadModule {}
