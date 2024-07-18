export type PostData = {
  "id": number,
  "user_id": number,
  "title": string,
  "content": string,
  "created_at": string,
  "updated_at": string,
}
export type PostListResponseData = PostData[]
export type LoggedInUserData = {
  token: string;
  email: string;
}