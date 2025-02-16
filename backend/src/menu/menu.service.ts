
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}

  private buildIncludeRecursive(depth: number = 10): Prisma.MenuInclude {
    if (depth <= 0) return {};
    return {
      children: {
        include: this.buildIncludeRecursive(depth - 1),
        orderBy: {
          createdAt: 'asc',
        },
      },
    };
  }

  async getMenus(maxDepth: number = 10) {
    return this.prisma.menu.findMany({
      where: { parentId: null },
      orderBy: { createdAt: 'asc' },
      include: this.buildIncludeRecursive(maxDepth),
    });
  }

  async getMenu(id: string, maxDepth: number = 10) {
    const menu = await this.prisma.menu.findUnique({
      where: { id },
      include: this.buildIncludeRecursive(maxDepth),
    });

    if (!menu) throw new NotFoundException(`Menu with ID ${id} not found`);
    return menu;
  }

  async createMenu(createMenuDto: CreateMenuDto) {
    const { parentId, name } = createMenuDto;
    let depth = 0;

    if (parentId) {
      const parent = await this.prisma.menu.findUnique({
        where: { id: parentId },
      });

      if (!parent) {
        throw new Error(`Parent menu with ID ${parentId} does not exist.`);
      }
      depth = parent.depth + 1;
    }

    return this.prisma.menu.create({
      data: {
        name,
        depth,
        ...(parentId && {
          parent: {
            connect: { id: parentId },
          },
        }),
      },
    });
  }

  async updateMenu(id: string, updateMenuDto: UpdateMenuDto) {
    const menu = await this.prisma.menu.findUnique({
      where: { id },
      include: { parent: true },
    });

    if (!menu) throw new NotFoundException(`Menu with ID ${id} not found`);

    const { parentId, ...menuData } = updateMenuDto;

    let depth = menu.depth;
    if (parentId && parentId !== menu.parentId) {
      const newParent = await this.prisma.menu.findUnique({
        where: { id: parentId },
      });

      if (newParent) {
        depth = newParent.depth + 1;
      }
    }

    return this.prisma.menu.update({
      where: { id },
      data: {
        ...menuData,
        depth,
        ...(parentId && {
          parent: {
            connect: { id: parentId },
          },
        }),
      },
      include: {
        children: {
          orderBy: { createdAt: 'asc' },
        },
        parent: true,
      },
    });
  }

  async deleteMenu(id: string) {
    const menu = await this.prisma.menu.findUnique({
      where: { id },
      include: { children: true },
    });

    if (!menu) throw new NotFoundException(`Menu with ID ${id} not found`);

    const deleteRecursive = async (menuId: string) => {
      const childMenus = await this.prisma.menu.findMany({
        where: { parentId: menuId },
      });

      for (const child of childMenus) {
        await deleteRecursive(child.id);
      }

      await this.prisma.menu.delete({ where: { id: menuId } });
    };

    await deleteRecursive(id);
  }
}
