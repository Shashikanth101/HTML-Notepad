import HeadComponent from '../HeadComponent'
import NavHeader from '../navbar/NavHeader'
import BreadCrumbs from '../breadcrumbs/BreadCrumbs'
 
export default function AuthLayout({ children, title, heading, breadCrumbsList }) {
  return (
    <>
      <HeadComponent title={title} />
      <main>
        <NavHeader publicPage={false} loginPage={false} />
        {breadCrumbsList && <BreadCrumbs list={breadCrumbsList} />}
        <div>
          {heading && <h1 style={{textAlign: 'center'}}>{heading}</h1>}
          <div>
            {children}
          </div>
        </div>
      </main>
    </>
  )
}