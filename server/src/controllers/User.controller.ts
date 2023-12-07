import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import { Body, Controller, Get, Path, Post, Queries, Query, Request, Route, Security, Tags } from 'tsoa';
import {
  ResponseCreateUser,
  ResponseGetUser,
  ResponseGetUserById,
  ResponseGetAllUser,
} from '../interfaces/user/response.interface';
import { RestCreateUser, RestGetUser } from '../interfaces/user/rest.interface';
import { UserService } from '../services/UserService';
//Hereglegchtei holbootoi controller
//Swagger deer haragdana
//Hereglegch uusgeh, id aar avah, buh hereglgechiig avah zereg uildluudiig bichsen
@Route('/user')
export class UserController extends Controller {
  @Post('/create')
  @Tags('CreateUser')
  public async createUser(@Body() req: RestCreateUser): Promise<ResponseCreateUser> {
    const userId = new UserService().CreateUser(req);
    if ((await userId).error) {
      this.setStatus(404);
      return userId;
    }
    this.setStatus(201);
    return userId;
  }
  @Post('/getUser')
  @Tags('GetUser')
  public async getUser(
    @Body() req: RestGetUser,
    @Request() request: express.Request,
  ): Promise<ResponseGetUser> {
    const res = request.res;
    const user = new UserService().GetUser(req);
    if ((await user).error) {
      this.setStatus(404);
      return user;
    }
    const userData = (await user).data;
    const { id } = userData || {};
    const token = await jwt.sign({ id }, 'secret', { expiresIn: '1h' });
    res?.cookie('token', token, {
      httpOnly: false,
      sameSite: 'none',
      secure: true,
      maxAge: 3600000,
    });
    this.setStatus(200);
    return user;
  }
  @Security('jwt')
  @Get('/getUserById/{userId}')
  @Tags('GetUserById')
  public async getUserById(@Path() userId: string): Promise<ResponseGetUserById> {
    const response = new UserService().getUserById(userId);
    if ((await response).error) {
      this.setStatus(404);
      return response;
    }
    this.setStatus(200);
    return response;
  }
  @Get('/get')
  @Tags('GetAllUser')
  public async getAllUser(): Promise<ResponseGetAllUser> {
    const data = await new UserService().getAllUser();
    if (data.error) {
      this.setStatus(400);
      return data;
    }
    this.setStatus(200);
    return data;
  }


}
