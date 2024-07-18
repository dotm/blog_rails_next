import PostList from '@/components/PostList'
import Sidebar from '@/components/Sidebar'

export default function HomePage() {
  return (
    <Sidebar pageTitle='Post List' navTitle='Post List'>
      <PostList />
    </Sidebar>
  )
}
