import type { InferGetStaticPropsType } from 'next'

import Main from '@/components/design/main'
import Page from '@/components/page'
import type { Content } from '@/lib/fetchContent'
import fetchContent from '@/lib/fetchContent'

function Home(props: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Page>
      <Main className='flex flex-col p-4'>
        <div className='flex flex-grow flex-col items-center justify-center'>
          <ul className='space-y-4'>
            {props?.apps.map(({ text, url }) => (
              <li className='text-center ' key={url}>
                <a
                  className='text-2xl text-cb-pink hover:underline'
                  href={url}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Main>
    </Page>
  )
}

export const getStaticProps = async () => {
  const data: Content = await fetchContent()
  return {
    props: {
      apps: data.list.map(item => {
        const [text, url] = item.split('\t')
        return {
          url,
          text,
        }
      }),
    },
    revalidate: 1,
  }
}

export default Home
