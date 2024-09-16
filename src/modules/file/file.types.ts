import { ApiProperty } from '@nestjs/swagger';
import { File } from '@/_gen/prisma-class/file';

export class FileUploadVo {
  @ApiProperty({ description: '文件原名' })
  name: string;

  @ApiProperty({ description: '文件路径' })
  url: string;

  constructor(fileEntity: File) {
    this.name = fileEntity.originalName;
    this.url = fileEntity.host + '/' + fileEntity.accessPath;
  }
}
