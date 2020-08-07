import HeadComponent from '../HeadComponent'
import NavHeader from '../navbar/NavHeader'

export default function PublicLayout({children, title, isloginPage}) {
  return (
    <div>
      <HeadComponent title={title}/>  
      <main>
        <NavHeader publicPage={true} loginPage={isloginPage}/>
        {children}
      </main>
    </div>
  )
}