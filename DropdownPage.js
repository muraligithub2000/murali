import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useEffect } from "react";

function DropdownPage() {
  const [dropdown1, setDropdown1] = useState("");
  const [dropdown2, setDropdown2] = useState("");
  const [dropdown3, setDropdown3] = useState("");
  const [dropdown4Options, setDropdown4Options] = useState([]);
  const [dropdown4, setDropdown4] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDropdown4Data = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/dropdown4");
        setDropdown4Options(res.data);
      } catch (err) {
        console.error("Error fetching dropdown4 data:", err);
      }
    };

    fetchDropdown4Data();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!dropdown1 || !dropdown2 || !dropdown3 ||!dropdown4) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Submission",
        text: "Please select all dropdowns before submitting.",
      });
      return;
    }

    try {
      await axios.post("http://localhost:3000/api/save", {
        dropdown1,
        dropdown2,
        dropdown3,
         dropdown4,
      });
      Swal.fire({
        title: "Upload Success",
        icon: "success",
      });

      setDropdown1("");
      setDropdown2("");
      setDropdown3("");
      setDropdown4("");
    } catch (err) {
      Swal.fire({
        title: "Failed!",
        text: "Could not submit data.",
        icon: "error",
      });
      console.error(err);
    }
  };

const handleBack = () => {
  navigate("/login", { state: { reset: true } });
};

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-12">
          <div className="card shadow-lg p-4 rounded-4">
            <h3 className="text-center mb-4">Dropdown Submission</h3>
            <button className="btn btn-secondary mb-3" onClick={handleBack}>
              ← Back to Login
            </button>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Select 1:</label>
                <select
                  className="form-select"
                  value={dropdown1}
                  onChange={(e) => setDropdown1(e.target.value)}
                >
                  <option value="">Select an item</option>
                  <option value="DOG">DOG</option>
                  <option value="BIG DOG">BIG DOG</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Select 2:</label>
                <select
                  className="form-select"
                  value={dropdown2}
                  onChange={(e) => setDropdown2(e.target.value)}
                >
                  <option value="">Select an item</option>
                  <option value="DAY">DAY</option>
                  <option value="NIGHT">NIGHT</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="form-label">Select 3:</label>
                <select
                  className="form-select"
                  value={dropdown3}
                  onChange={(e) => setDropdown3(e.target.value)}
                >
                  <option value="">Select an item</option>
                  <option value="BLACK">BLACK</option>
                  <option value="WHITE">WHITE</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="form-label">Select 4:</label>
                <select
                  className="form-select"
                  value={dropdown4}
                  onChange={(e) => setDropdown4(e.target.value)}
                >
                  <option value="">Select an item</option>
                  {dropdown4Options.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="d-grid">
                <button className="btn btn-primary" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
      
export default DropdownPage;
