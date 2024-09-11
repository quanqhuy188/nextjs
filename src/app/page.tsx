import Link from 'next/link'
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
        <ul>
          <li>
          <Link href="/facebook">facebook</Link>
          </li>
          <li>
          <Link href="/youtube">youtube</Link>
          </li>

        </ul>
    </div>
  );
}
