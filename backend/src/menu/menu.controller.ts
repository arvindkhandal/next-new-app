import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  async getMenus(@Query('depth') depth?: number) {
    try {
      return await this.menuService.getMenus(depth);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to fetch menus',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async getMenu(@Param('id') id: string) {
    try {
      const menu = await this.menuService.getMenu(id);
      if (!menu) {
        throw new HttpException('Menu not found', HttpStatus.NOT_FOUND);
      }
      return menu;
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to fetch menu',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  async createMenu(@Body() createMenuDto: CreateMenuDto) {
    try {
      return await this.menuService.createMenu(createMenuDto);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to create menu',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  async updateMenu(
    @Param('id') id: string,
    @Body() updateMenuDto: UpdateMenuDto,
  ) {
    try {
      const menu = await this.menuService.updateMenu(id, updateMenuDto);
      if (!menu) {
        throw new HttpException('Menu not found', HttpStatus.NOT_FOUND);
      }
      return menu;
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to update menu',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async deleteMenu(@Param('id') id: string) {
    try {
      await this.menuService.deleteMenu(id);
      return { message: 'Menu deleted successfully' };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to delete menu',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
