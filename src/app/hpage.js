import Link from 'next/link';

const HomePage = () => {
  return (
    <div>
      <h1>Homepage</h1>
      <div>
        <Link href="/page1">
          <a>
            <button>Go to Page 1</button>
          </a>
        </Link>
      </div>
      <div>
        <Link href="/page2">
          <a>
            <button>Go to Page 2</button>
          </a>
        </Link>
      </div>
      <div>
        <Link href="/page3">
          <a>
            <button>Go to Page 3</button>
          </a>
        </Link>
      </div>
      <div>
        <Link href="/page4">
          <a>
            <button>Go to Page 4</button>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
