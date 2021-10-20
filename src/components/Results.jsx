import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactPlayer from 'react-player';

import { useResultContext } from '../context/ResultContextProvider';
import Loading from './Loading';

const Results = () => {
  const { results, loading, getResults, searchTerm } = useResultContext();
  const location = useLocation();

  useEffect(() => {
    if (searchTerm) {
      if (location.pathname === '/videos') {
        getResults(`/search/q=${searchTerm} videos`);
      } else {
        getResults(`${location.pathname}/q=${searchTerm}&num=40`);
      }
    }
  }, [searchTerm, location.pathname]);

  console.log(results);
  loading && <Loading />;

  switch (location.pathname) {
    case '/search':
      return (
        <div className='flex flex-wrap justify-between space-y-6 sm:px-56'>
          {results?.results?.map(({ link, title }, i) => (
            <div key={i} className='md:w-2/5 w-full'>
              <a href={link} target='_blank'>
                <p className='text-sm'>
                  {link.length > 30 ? link.substring(0, 30) : link}
                </p>
                <p className='text-lg hover:underline dark:text-blue-300 text-blue-700'>
                  {title}
                </p>
              </a>
            </div>
          ))}
        </div>
      );
    case '/images':
      return (
        <div className='flex flex-wrap justify-center items-center'>
          {results?.image_results?.map(
            ({ image, link: { href, title } }, i) => (
              <a href={href} key={i} target='_blank' className='sm:p-3 p-5 '>
                <img src={image?.src} alt={title} loading='lazy' />
                <p className='w-36 break-words text-sm mt-2'>{title}</p>
              </a>
            )
          )}
        </div>
      );
    case '/videos':
      return 'Videos';
    case '/news':
      return 'News';
    default:
      return 'Error';
  }
  return <div>Results</div>;
};

export default Results;
