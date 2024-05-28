import ImageComponent from "@/components/ImageComponent";
import ControlPanel from "@/components/ControlPanel";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <>
      <div className={styles.homeContainer}>
        <ImageComponent imageId={1}/>
        <ControlPanel imageId={1} />
      </div>
    </>
  );
}
