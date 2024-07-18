import PostAdd from '@/components/PostAdd'
import Sidebar from '@/components/Sidebar'

export default function NewPostPage() {
  return (
    <Sidebar pageTitle='Add New Post' navTitle='Add New Post'>
      <PostAdd />
    </Sidebar>
  )
}
