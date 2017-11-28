// import axios from 'axios';

export const baseUrl = `http://localhost:3000/api`;

export function postLogin(username, password) {
  return fetch(`${baseUrl}/login`, {
    credentials: 'include', // pass cookies, for authentication
    method: 'post',
    headers: {
      Accept: 'application/json, application/xml, text/plain, text/html, *.*',
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    },
    body: `username=${username}&password=${password}`,
    mode: 'cors'
  });
}

export function getProjects() {
  return fetch(`${baseUrl}/projects`, {
    method: 'get',
    mode: 'cors'
  });
}

export function getProject(id) {
  return axios.get(`${baseUrl}/projects/${id}`);
}

export function getReview(id) {
  return fetch(`${baseUrl}/reviews?projectId=${id}`);
}
