import {useEffect} from 'react'

export default function GoogleAds({slot}){
  useEffect(()=>{
    const pushAd = () => {
      try{
        const adsbygoogle = window.adsbygoogle
        console.log({adsbygoogle})
        adsbygoogle.push({})
      }catch(e){
        console.error(e)
      }
    }

    let interval = setInterval(()=>{
      if(window.adsbygoogle){
        pushAd()
        clearInterval(interval)
      }
    },300)
    return ()=>{
      clearInterval(interval)
    }
  },[])

  return (
    <ins className='adsbygoogle'
      style={{display:'block'}}
      data-ad-client= 'ca-pub-4162051726403772'
      data-ad-slot={slot}
      data-ad-format= 'auto'
      // data-adtest='on'
      data-full-width-responsive="true"
      ></ins>
  )
}