import { 
  Controller, 
  Get, 
  Param, 
  Res,
  Delete 
} from '@nestjs/common';
import { AppService } from './app.service';
import * as fs from "fs";
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  
  /**
   * @param image [Required] File Name which must be returned
   * @param res 
   * @returns File
   */
  @ApiOperation({
    operationId: "Sends a file through the response object",
    description: "Sends a file through the response object"
  })
  //@ApiProduces("File")
  @Get("get-image/:id")
  getImage(
    @Param("id") image: string,
    @Res() res
  ): Promise<any> {
    return res.sendFile(image, { root: "./uploads" });
  }
  
  /***
   * @param fileName [Required] Specifies the file to delete
   */
  @ApiOperation({
    operationId: "Deletes a file through the response object",
    description: "Deletes a file through the response object"
  })
  @Delete("delete-file/:id")//test this route
    async deleteFile(@Param("id") fileName: string): Promise<{ message: string }> {
        await fs.unlinkSync(fileName);
        return { message: "File deleted" }; 
    }

}
