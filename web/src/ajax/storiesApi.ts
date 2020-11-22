import * as routeConstants from '../constants/routeConstants';
import { axiosGet } from './index';

export async function getUsers(params?: any) {
    const response = await axiosGet(routeConstants.UsersUrl, params);

    return response.data;
}

export async function test(params?: any) {
    const response = await axiosGet('https://jsonplaceholder.typicode.com/posts', params);

    const testData = response.data;

    return testData;
}
