/* eslint-disable indent */
import React, {
  Suspense,
  LazyExoticComponent,
  MemoExoticComponent,
  ExoticComponent,
} from 'react';
import Loader from 'src/Components/Loader';

// eslint-disable-next-line operator-linebreak
const SuspenseLoader =
  (
    Element:
      | LazyExoticComponent<MemoExoticComponent<() => JSX.Element>>
      | ExoticComponent<any>
  ) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  (props: object) => {
    return (
      <Suspense fallback={<Loader />}>
        <Element {...props} />
      </Suspense>
    );
  };

export default SuspenseLoader;
