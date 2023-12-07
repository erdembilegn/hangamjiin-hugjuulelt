import { PrismaClient } from '@prisma/client';
import { ResponseCreateAward, ResponseGetAward} from '../interfaces/award/response.interface';
import { RestCreateAward} from '../interfaces/award/rest.interface';
const prisma = new PrismaClient();
//Tsol uusgeh, avahad ymr data damjuulahiig helj ugsun code
export class AwardService {
  public async createAward(req: RestCreateAward): Promise<ResponseCreateAward> {
    try {
      const data = await prisma.award.create({
        data: {
          name: req.name,
          minNumber : req.minNumber,
          maxNumber : req.maxNumber,
          createdUser: req.createdUser,
        },
      });
      return {
        data: {
          id: data.id,
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
  public async getAward(): Promise<ResponseGetAward> {
    try {
      const awards = await prisma.award.findMany();
      const data = awards.map((award) => ({
        id: award.id,
        name : award.name,
        minNumber : award.minNumber,
        maxNumber : award.maxNumber,
        createdAt: award.createdAt,
        updatedAt: award.updatedAt,
        createdUser : award.createdUser,
      }));
      return {
        data
      };
    } catch (error) {
      return {
        error: {
          message: (error as Error).message,
        },
      };
    }
  }
}

