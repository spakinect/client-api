import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Easy to Use',
    description: (
      <>
        Spakinect Client API was designed to be easily integrated into your
        existing systems with clear documentation and simple endpoints.
      </>
    ),
  },
  {
    title: 'Secure & Reliable',
    description: (
      <>
        Built with security in mind, using industry-standard authentication
        and encryption to protect sensitive patient data.
      </>
    ),
  },
  {
    title: 'Real-time Updates',
    description: (
      <>
        Stay informed with webhook notifications for important events like
        visit updates and treatment changes.
      </>
    ),
  },
];

function Feature({title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

