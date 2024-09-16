import { APP_CONFIG_TOKEN, IAppConfig } from '@/configs/app-config';
import { OSS_CONFIG_TOKEN } from '@/configs/oss-config';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import { NestMinioOptions, NestMinioService } from 'nestjs-minio';
import { PrismaService } from 'nestjs-prisma';
import { FileUploadVo } from './file.types';

@Injectable()
export class FileService {
  constructor(
    private readonly minioService: NestMinioService,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  readonly minio = this.minioService.getMinio();

  readonly bucket = this.configService.get<IAppConfig | undefined>(
    APP_CONFIG_TOKEN,
  )?.ossBucket;

  async uploadFile(file: Express.Multer.File) {
    const uuid = randomUUID();
    // 获取文件后缀
    const ext = file.originalname.split('.').pop();
    const haxFileName = `${uuid}${ext ? '.' + ext : ''}`;
    const metaData = {
      'Content-Type': file.mimetype,
    };
    await this.minio.putObject(
      this.bucket,
      haxFileName,
      file.buffer,
      file.size,
      metaData,
    );

    const fileEntity = await this.prisma.file.create({
      data: {
        id: uuid,
        name: haxFileName,
        originalName: file.originalname,
        host: this.configService.get<NestMinioOptions | undefined>(
          OSS_CONFIG_TOKEN,
        )?.endPoint,
        accessPath: this.bucket + '/' + haxFileName,
      },
    });

    return new FileUploadVo(fileEntity);
  }

  async getFileUrl(fileName: string, bucketName: string): Promise<string> {
    return (await this.minio.presignedGetObject(bucketName, fileName)).split(
      '?',
    )[0];
  }
}
