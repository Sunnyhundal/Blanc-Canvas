import TypeSelectionBox from "../components/TypeSelectionBox";
import { useNewProject } from "../hooks/NewProjectContext";
import { useAuth } from "../hooks/AuthContext";
import InputField from "../components/InputField";
import { useEffect } from "react";
import { useEditProject } from "../hooks/EditProjectContext";

export default function NewProjectFormRoute() {
  const {
    imagePreview,
    setImagePreview,
    formData,
    setFormData,
    handleInputChange,
    handleFileChange,
    handleProjectTypeForm,
    handleSubmit,
    selectedProject,
    filteredProjectType,
    projectTypeQuery,
    setProjectTypeQuery,
    handleLocationTypeForm,
    selectedLocation,
    filteredLocationType,
    locationTypeQuery,
    setLocationTypeQuery,
    handleLocationTypeSelect,
    handleProjectTypeSelect,
  } = useNewProject();

  const { isEditMode } = useEditProject();

  // const handleProjectTypeSelect = (value) => {
  //   setSelectedProject(value);
  //   handleProjectTypeForm(value.name);
  // };

  // const handleLocationTypeSelect = (value) => {
  //   setSelectedLocation(value);
  //   handleLocationTypeForm(value.name);
  // };

  const { user, checkAuthentication, isLoading } = useAuth();

  useEffect(() => {
    const fetchData = async() => {
      const isAuthenticated = await checkAuthentication();
      if(!isAuthenticated) {
        console.warn('You must log in to acccess this page')
      }
    };
    fetchData();
  }, [checkAuthentication]);

  const employer_id = user ? user.id : null;

  if (isLoading) {
    return <div className="m-20">Loading...</div>;
  };

  if (!user) {
    return (
      <div className="m-20">
        <p>You must log in to access this page.</p>
      </div>
    );
  };

  return (
    <div className="m-20">
      <form onSubmit={(e) => handleSubmit(e, employer_id)}>
        <div className="flex justify-center items-start">
          <div>
            {isEditMode ? ( <h2>Edit Project</h2> ) : ( <h2>Create a New Project</h2> )}
          </div>
          <div className="relative">
            
            <label className="border-solid border rounded-lg w-56 h-56 m-5 flex items-center justify-center text-white cursor-pointer relative">
              {!imagePreview && (
                <input
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              )}

              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" height="7em" viewBox="0 0 512 512" fill="#F27F3D">
                  {/*<!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->*/}
                  <path d="M448 80c8.8 0 16 7.2 16 16V415.8l-5-6.5-136-176c-4.5-5.9-11.6-9.3-19-9.3s-14.4 3.4-19 9.3L202 340.7l-30.5-42.7C167 291.7 159.8 288 152 288s-15 3.7-19.5 10.1l-80 112L48 416.3l0-.3V96c0-8.8 7.2-16 16-16H448zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm80 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"/>
                </svg>
              )}
            </label>

            {imagePreview && (
              <button
                type="button"
                className="absolute top-1 right-1 text-pink-900"
                onClick={() => {
                  setImagePreview(null);
                  setFormData({
                    ...formData,
                    image: null,
                  });
                }}
              >
                <span className="indicator-item badge badge-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                  </svg>
                </span> 
              </button>
            )}
          </div>

          <div className="flex flex-col items-center justify-center m-5 mt-0">
            <InputField
              label="What's the name of your project?"
              name="projectName"
              type="text"
              placeholder="Project Name"
              value={formData.projectName}
              onChange={handleInputChange}
              required
            />
            <InputField
              label="Tell us about your project!"
              name="description"
              type="text"
              placeholder="Description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
           
            <InputField
              label="Whats your budget"
              name="budget"
              type="number"
              placeholder="Description"
              value={isNaN(formData.budget) ? '' : formData.budget}
              onChange={handleInputChange}
              required
            />

            <TypeSelectionBox
              label="Where is it happening?"
              onChange={handleLocationTypeForm}
              selectedType={selectedLocation}
              handleSelect={handleLocationTypeSelect}
              filteredType={filteredLocationType}
              query={locationTypeQuery}
              setQuery={setLocationTypeQuery} />
          
            <TypeSelectionBox
              label="What kind of project?"
              onChange={handleProjectTypeForm}
              selectedType={selectedProject}
              handleSelect={handleProjectTypeSelect}
              filteredType={filteredProjectType}
              query={projectTypeQuery}
              setQuery={setProjectTypeQuery} />

          </div>
        </div>
        <button className="btn btn-primary text-white" type="submit">
        {isEditMode ? "Update Project" : "Post Project"}
        </button>
      </form>
    </div>
  );
}
