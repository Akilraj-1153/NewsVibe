import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { CurrentPage } from '../../Configuration/Atom'

const SearchPage = () => {
  const [page, setPage] = useRecoilState(CurrentPage)
  useEffect(() => {
    setPage("Search News")
  }, [])

  return (
    <div className='bg-red-900'>Search News</div>
  )
}

export default SearchPage