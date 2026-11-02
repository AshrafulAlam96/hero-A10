import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const PartnerDetails = () => {
  const { id } = useParams();
  const [partner, setPartner] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/partners/${id}`)
      .then((res) => {
        setPartner(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;

  if (!partner)
    return (
      <div className="text-center py-20">
        Partner not found
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card bg-base-100 shadow-xl">
        <figure>
          <img
            src={partner.profileImage}
            alt={partner.name}
            className="w-full h-80 object-cover"
          />
        </figure>

        <div className="card-body">
          <h2 className="card-title">{partner.name}</h2>

          <p>
            <strong>Subject:</strong> {partner.subject}
          </p>

          <p>
            <strong>Study Mode:</strong> {partner.studyMode}
          </p>

          <p>
            <strong>Experience:</strong> {partner.level}
          </p>

          <p>
            <strong>Location:</strong> {partner.location}
          </p>

          <p>
            <strong>Partner Count:</strong> {partner.partnerCount}
          </p>

          <p>{partner.description}</p>

          <button
            className="btn btn-primary"
            onClick={() => {
              toast.success("Ready for connection request");
            }}
          >
            Send Partner Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default PartnerDetails;