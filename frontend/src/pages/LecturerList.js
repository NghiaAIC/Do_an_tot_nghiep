import ButtonClick from "../components/addLecturerButton";
import FruitList from "../components/displayLecturer";

function GiangVien() {
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          margin: "20px",
        }}
      >
        <ButtonClick />
      </div>
      <div style={{ margin: "20px" }}>
        <FruitList />
      </div>
    </div>
  );
}

export default GiangVien;
