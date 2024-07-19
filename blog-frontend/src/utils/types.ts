export type PostData = {
  id: number,
  user_id: number,
  title: string,
  content: string,
  created_at: string,
  updated_at: string,
}
export type PostListResponseData = {
  data: PostData[],
}
export type LoggedInUserData = {
  token: string;
  email: string;
}
export type NewPostValues = {
  title: string;
  content: string;
}