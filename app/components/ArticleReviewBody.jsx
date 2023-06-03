'use client'
import { useContext } from 'react'
import { useParams } from 'next/navigation'
import { NewsListContext } from '../context/NewsListContext'

const ArticleReviewBody = () => {
  const { sortedList } = useContext(NewsListContext)
  const params = useParams()

  const article = sortedList.find(article => article._id === params.postId)
  console.log(sortedList)
  return (
    <>
      <div className='text-white overflow-hidden relative bg-black/[.50] flex flex-col gap-16 m-auto'>
        <img
          src={article?.image}
          className='absolute w-full h-full object-cover -z-10 blur-sm'
        />
        <section className='gap-16 px-5 flex w-full sm:w-2/3 flex-col sm:m-auto'>
          <h1 className='text-3xl mt-5 font-bold'>{article?.title}</h1>
          <p className='text-xl'>{article?.text}</p>
        </section>
        <div>
          <img className='md:w-2/3 w-5/6 object-cover mx-auto' loading='lazy' src={article?.image} />
        </div>
      </div>
      <section>
        <p className='text-white text-xl p-5'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus fugiat aspernatur modi praesentium cumque! Veniam culpa odio architecto, deserunt voluptatibus eligendi? Pariatur magni sit modi, velit aliquid ut reiciendis consequatur.
          Quo officia voluptatibus, harum blanditiis architecto cupiditate asperiores laboriosam molestias dolor autem recusandae aliquam ea itaque voluptas accusamus inventore quis minima tempore facilis atque. Repudiandae necessitatibus at veniam officiis nemo.
          Nulla consectetur aut quis neque odio repellendus illum molestias suscipit nostrum odit aspernatur, praesentium, totam facilis laborum possimus nesciunt sit ducimus laudantium corporis ex voluptatibus tempora quo! Omnis, vero magni!
          Placeat distinctio numquam unde, labore enim odio, nesciunt molestiae error hic fugiat possimus recusandae, iusto quod explicabo ipsa cumque excepturi. Voluptatum consectetur alias distinctio debitis nobis optio nam, error sequi.
          Incidunt debitis modi ducimus explicabo illo laborum. Sapiente sed iste, consequuntur tempore vero provident libero ullam alias pariatur odit quod officiis exercitationem, necessitatibus distinctio earum ab quam dignissimos blanditiis eveniet.
          Doloribus minima rerum quod veritatis molestias eveniet provident, eius dolorum adipisci, sequi molestiae non, reiciendis hic sunt! Adipisci excepturi nemo sit eligendi voluptatum repudiandae? Mollitia quasi quibusdam unde soluta consequuntur!
          Ipsa deserunt ex soluta ea repellendus consectetur dolores. Quis cupiditate eius veritatis repellendus, officiis blanditiis, maiores assumenda, accusantium libero atque tempora. Dolorem nam, voluptate quidem exercitationem veritatis aperiam perferendis eligendi!
          Natus sapiente veritatis accusamus repudiandae deleniti voluptas sint quis numquam dignissimos voluptates maiores quod sed libero eius, incidunt, ullam laudantium aliquam a sit fuga. Suscipit neque aliquam nostrum eveniet sequi?
          Expedita maiores, enim repudiandae quo facilis accusamus consequatur distinctio commodi quaerat aliquam a minima fugit eligendi veniam ut illo adipisci illum eveniet vitae ex ab. Laudantium officiis quibusdam maiores magni?
          Nulla exercitationem accusamus perspiciatis delectus iure ea non doloribus corrupti quam libero illum hic minima voluptates commodi amet porro quis, impedit nemo debitis ipsa saepe soluta? Sunt id at quisquam?
          Minus esse accusamus et iste quam voluptatibus fugiat consectetur facere ipsum aspernatur similique alias in, voluptas quod magni! Magni dolore quasi officia nemo nobis, id exercitationem deserunt sint minus natus.
          Alias doloribus maiores incidunt accusantium quae distinctio porro earum, quisquam similique voluptatum necessitatibus repellat ea iure reiciendis sequi et eligendi est ut explicabo? Fuga ipsum et praesentium consectetur, excepturi aperiam.
          Iste, fugiat qui molestias tenetur excepturi vero quae iure ab, maxime quas consequuntur pariatur dolores voluptatum at ullam. Rem eum repellat necessitatibus laboriosam minus nesciunt veritatis optio consectetur possimus magnam.
          Molestias perferendis dolorum quasi deleniti voluptatem culpa facere ad voluptates blanditiis cum id sunt rem fugiat accusamus obcaecati iste enim expedita, itaque nostrum quae placeat odit, earum modi! Adipisci, excepturi.
          Quas maxime eligendi maiores incidunt sed quaerat nisi error autem ipsum quidem, dignissimos aut asperiores nesciunt aperiam beatae repellat molestiae, ab dolorem recusandae voluptatum necessitatibus. Asperiores saepe assumenda mollitia. Officia!
          Ad quam nostrum ex sequi, officia adipisci? Reiciendis, asperiores commodi! Repudiandae nostrum alias fuga itaque velit expedita placeat, officia explicabo voluptatem recusandae doloremque quo? Provident aliquid perspiciatis asperiores et. Non!
          Vitae veritatis aspernatur, pariatur iure iste impedit! Vel soluta debitis omnis aut aspernatur minus ducimus nihil, saepe commodi, enim natus expedita obcaecati neque, officia asperiores officiis quidem? Laborum, dolorem animi.
          Voluptatibus quia nulla, blanditiis nostrum eius explicabo repellat. Ad excepturi incidunt quibusdam veritatis at officia vitae esse? Sunt, saepe sed? Culpa maiores temporibus dicta laborum nihil repellendus eligendi totam reprehenderit?
          Aperiam ad quibusdam exercitationem aliquid voluptatibus tenetur illo maiores reiciendis dicta repellat. Ipsa ad maiores sequi saepe exercitationem, excepturi similique vero fugit sint cum iste voluptates voluptatum eveniet, quo adipisci.
          Sunt, ut? Dignissimos perferendis provident nisi quidem illum eligendi, id sapiente iure dolor iusto praesentium repudiandae aliquam atque, eos nemo? Doloremque facere perferendis neque fuga est ipsa quibusdam aliquam nobis?
        </p>
      </section>
    </>
  )
}

export default ArticleReviewBody
