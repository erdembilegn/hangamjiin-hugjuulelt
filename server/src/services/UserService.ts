import { PrismaClient } from '@prisma/client';
import {
  ResponseCreateUser,
  ResponseGetAllUser,
  ResponseGetUser,
  ResponseGetUserById,
} from '../interfaces/user/response.interface';
import { RestCreateUser, RestGetUser } from '../interfaces/user/rest.interface';
import { encryptPassword } from '../utils';
import { clearConfigCache } from 'prettier';
const prisma = new PrismaClient();
//Hegelgech uusgeh, avah, id aar avah, buh hereglegchiig avahad ymr data damjuulahiig helj ugsun code
export class UserService {
  public async CreateUser(req: RestCreateUser): Promise<ResponseCreateUser> {
    try {
      const password = encryptPassword(req.password);
      const user = await prisma.user.create({
        data: {
          email: req.email,
          firstName: req.firstName,
          lastName: req.lastName,
          password,
          grade: req.grade ?? null,
          role: req.role,
        },
      });

      if (!user)
        return {
          error: {
            message: 'User not created',
          },
        };
      return { data: { id: user.id } };
    } catch (error) {
      return {
        error: {
          message: (error as Error).message,
        },
      };
    }
  }
  public async GetUser(req: RestGetUser): Promise<ResponseGetUser> {
    try {
      const password = encryptPassword(req.password);
      const user = await prisma.user.findUnique({
        where: {
          email: req.email,
          password,
        },
      });
      if (!user)
        return {
          error: {
            message: 'User not found',
          },
        };
      const verified = password === user.password;
      return verified
        ? {
            data: {
              id: user.id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              grade: user.grade ?? null,
              award: user.awardId ?? null,
              role: user.role,
            },
          }
        : {
            error: {
              message: 'Password is incorrect',
            },
          };
    } catch (error) {
      return {
        error: {
          message: (error as Error).message,
        },
      };
    }
  }
  public async getUserById(userId: string): Promise<ResponseGetUserById> {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
      if (!user) {
        return {
          error: {
            message: 'User not found',
          },
        };
      }
      return {
        data: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          grade: user.grade ?? null,
          award: user.awardId ?? null,
          role: user.role,
        },
      };
    } catch (error) {
      return {
        error: {
          message: (error as Error).message,
        },
      };
    }
  }
  public async getAllUser(): Promise<ResponseGetAllUser> {
    try {
      const user = await prisma.user.findMany();
      return {
        data: user,
      };
      console.log('user', user)
    } catch (error) {
      return {
        error: {
          message: (error as Error).message,
        },
      };
    }
  }
}
