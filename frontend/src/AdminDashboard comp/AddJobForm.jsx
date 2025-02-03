import { useState} from "react";
// import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// eslint-disable-next-line react/prop-types
export function AddJobForm({ onJobAdded }) {
  const [formData, setFormData] = useState({
    jobName: "",
    experience: "",
    jobDescription: "",
    salary: "",
  });

//   useEffect(() => {
//     gsap.from(".form-field", {
//       opacity: 0,
//       y: 20,
//       stagger: 0.1,
//       duration: 0.5,
//       ease: "power2.out",
//     });
//   }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Job Data:", formData);

    // Call the onJobAdded function passed as prop to show toast
    onJobAdded();

    // Reset the form fields after submitting
    setFormData({
      jobName: "",
      experience: "",
      jobDescription: "",
      salary: "",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Job</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-field">
            <Label htmlFor="jobName">Job Name</Label>
            <Input
              id="jobName"
              name="jobName"
              value={formData.jobName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-field">
            <Label htmlFor="experience">Experience</Label>
            <Input
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-field">
            <Label htmlFor="jobDescription">Job Description</Label>
            <Textarea
              id="jobDescription"
              name="jobDescription"
              value={formData.jobDescription}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-field">
            <Label htmlFor="salary">Salary</Label>
            <Input
              id="salary"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Add Job
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
