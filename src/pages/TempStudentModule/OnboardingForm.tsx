import React, { useState, useCallback } from 'react';
import { ChevronRight, ChevronLeft, Save, Send, User, Home, Car, Heart, FileText, CheckCircle, Clock, Award } from 'lucide-react';

// FormInput component moved OUTSIDE to prevent cursor issues
const FormInput = React.memo(({ 
  label, 
  type = "text", 
  value, 
  onChange, 
  required = false, 
  options = null,
  placeholder = null 
}) => {
  const handleChange = useCallback((e) => {
    onChange(e.target.value);
  }, [onChange]);

  const inputId = `input-${label.toLowerCase().replace(/\s+/g, '-')}`;
  
  return (
    <div className="group">
      <label 
        htmlFor={inputId}
        className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors duration-200"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {type === "select" ? (
        <select
          id={inputId}
          value={value}
          onChange={handleChange}
          className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 transition-all duration-200 hover:border-slate-400 dark:hover:border-slate-500 text-sm sm:text-base"
        >
          <option value="">Select {label}</option>
          {options?.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea
          id={inputId}
          value={value}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 transition-all duration-200 resize-none hover:border-slate-400 dark:hover:border-slate-500 text-sm sm:text-base"
          placeholder={placeholder || `Enter ${label.toLowerCase()}`}
        />
      ) : (
        <input
          id={inputId}
          type={type}
          value={value}
          onChange={handleChange}
          className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 transition-all duration-200 hover:border-slate-400 dark:hover:border-slate-500 text-sm sm:text-base"
          placeholder={placeholder || `Enter ${label.toLowerCase()}`}
        />
      )}
    </div>
  );
});

const OnboardingForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Details
    fullName: '',
    dateOfBirth: '',
    gender: '',
    phone: '',
    email: '',
    emergencyContact: '',
    emergencyPhone: '',
    
    // Hostel Information
    hostelRequired: '',
    roomType: '',
    dietaryPreference: '',
    allergies: '',
    
    // Transport Information
    transportRequired: '',
    pickupLocation: '',
    routePreference: '',
    
    // Medical Information
    bloodGroup: '',
    medicalConditions: '',
    medications: '',
    doctorContact: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [savedProgress, setSavedProgress] = useState(false);
  const totalSteps = 4;

  // Fixed input change handler
  const handleInputChange = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const handleNext = useCallback(() => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  }, [currentStep, totalSteps]);

  const handlePrev = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  const handleSaveProgress = useCallback(() => {
    setSavedProgress(true);
    // Simulate API call
    setTimeout(() => {
      alert('Progress saved successfully!');
      setSavedProgress(false);
    }, 1000);
  }, []);

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    alert('Form submitted successfully! Your onboarding information has been saved.');
    console.log('Form Data:', formData);
    setIsSubmitting(false);
  }, [formData]);

  // Calculate completion percentage
  const completionPercentage = (currentStep / totalSteps) * 100;

  const renderProgressBar = () => (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-sm text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-full">
          {Math.round(completionPercentage)}% Complete
        </span>
      </div>
      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
        <div 
          className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500 ease-out relative"
          style={{ width: `${completionPercentage}%` }}
        >
          <div className="absolute inset-0 bg-white opacity-20 animate-pulse"></div>
        </div>
      </div>
    </div>
  );

  const renderStepIcon = (step, icon) => (
    <div className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full transition-all duration-300 ${
      currentStep === step 
        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-110' 
        : currentStep > step 
        ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md' 
        : 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500'
    }`}>
      {currentStep > step ? <CheckCircle size={16} className="sm:w-5 sm:h-5" /> : icon}
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-6 sm:mb-8">
        <div className="flex items-center justify-center sm:justify-start mb-4 sm:mb-0">
          {renderStepIcon(1, <User size={18} className="sm:w-5 sm:h-5" />)}
        </div>
        <div className="text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">Personal Information</h2>
          <p className="text-slate-600 dark:text-slate-400 mt-1 text-sm sm:text-base">Let's start with your basic details</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <FormInput
          label="Full Name"
          value={formData.fullName}
          onChange={(value) => handleInputChange('fullName', value)}
          required
        />
        <FormInput
          label="Date of Birth"
          type="date"
          value={formData.dateOfBirth}
          onChange={(value) => handleInputChange('dateOfBirth', value)}
          required
        />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <FormInput
          label="Gender"
          type="select"
          value={formData.gender}
          onChange={(value) => handleInputChange('gender', value)}
          options={[
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
            { value: 'other', label: 'Other' }
          ]}
          required
        />
        <FormInput
          label="Phone Number"
          type="tel"
          value={formData.phone}
          onChange={(value) => handleInputChange('phone', value)}
          placeholder="+91 "
          required
        />
      </div>
      
      <FormInput
        label="Email Address"
        type="email"
        value={formData.email}
        onChange={(value) => handleInputChange('email', value)}
        placeholder="your.email@example.com"
        required
      />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <FormInput
          label="Emergency Contact Name"
          value={formData.emergencyContact}
          onChange={(value) => handleInputChange('emergencyContact', value)}
          placeholder="Parent/Guardian name"
          required
        />
        <FormInput
          label="Emergency Contact Phone"
          type="tel"
          value={formData.emergencyPhone}
          onChange={(value) => handleInputChange('emergencyPhone', value)}
          placeholder="+91 "
          required
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-6 sm:mb-8">
        <div className="flex items-center justify-center sm:justify-start mb-4 sm:mb-0">
          {renderStepIcon(2, <Home size={18} className="sm:w-5 sm:h-5" />)}
        </div>
        <div className="text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">Hostel Information</h2>
          <p className="text-slate-600 dark:text-slate-400 mt-1 text-sm sm:text-base">Tell us about your accommodation needs</p>
        </div>
      </div>
      
      <FormInput
        label="Do you require hostel accommodation?"
        type="select"
        value={formData.hostelRequired}
        onChange={(value) => handleInputChange('hostelRequired', value)}
        options={[
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]}
        required
      />
      
      {formData.hostelRequired === 'yes' && (
        <div className="space-y-4 sm:space-y-6 animate-fadeIn bg-blue-50 dark:bg-blue-900/20 p-4 sm:p-6 rounded-xl border border-blue-200 dark:border-blue-800">
          <FormInput
            label="Room Type Preference"
            type="select"
            value={formData.roomType}
            onChange={(value) => handleInputChange('roomType', value)}
            options={[
              { value: 'single', label: 'Single Room (₹15,000/month)' },
              { value: 'double', label: 'Double Sharing (₹10,000/month)' },
              { value: 'triple', label: 'Triple Sharing (₹8,000/month)' }
            ]}
          />
          
          <FormInput
            label="Dietary Preference"
            type="select"
            value={formData.dietaryPreference}
            onChange={(value) => handleInputChange('dietaryPreference', value)}
            options={[
              { value: 'vegetarian', label: 'Vegetarian' },
              { value: 'non-vegetarian', label: 'Non-Vegetarian' },
              { value: 'vegan', label: 'Vegan' },
              { value: 'jain', label: 'Jain Food' }
            ]}
          />
          
          <FormInput
            label="Food Allergies (if any)"
            type="textarea"
            value={formData.allergies}
            onChange={(value) => handleInputChange('allergies', value)}
            placeholder="Please list any food allergies or dietary restrictions"
          />
        </div>
      )}
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-6 sm:mb-8">
        <div className="flex items-center justify-center sm:justify-start mb-4 sm:mb-0">
          {renderStepIcon(3, <Car size={18} className="sm:w-5 sm:h-5" />)}
        </div>
        <div className="text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">Transportation</h2>
          <p className="text-slate-600 dark:text-slate-400 mt-1 text-sm sm:text-base">Choose your commute options</p>
        </div>
      </div>
      
      <FormInput
        label="Do you require college transport?"
        type="select"
        value={formData.transportRequired}
        onChange={(value) => handleInputChange('transportRequired', value)}
        options={[
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]}
        required
      />
      
      {formData.transportRequired === 'yes' && (
        <div className="space-y-4 sm:space-y-6 animate-fadeIn bg-green-50 dark:bg-green-900/20 p-4 sm:p-6 rounded-xl border border-green-200 dark:border-green-800">
          <FormInput
            label="Pickup Location"
            value={formData.pickupLocation}
            onChange={(value) => handleInputChange('pickupLocation', value)}
            placeholder="Enter your pickup address or nearest landmark"
          />
          
          <FormInput
            label="Route Preference"
            type="select"
            value={formData.routePreference}
            onChange={(value) => handleInputChange('routePreference', value)}
            options={[
              { value: 'route1', label: 'Route 1 - City Center (₹2,500/month)' },
              { value: 'route2', label: 'Route 2 - North Zone (₹2,200/month)' },
              { value: 'route3', label: 'Route 3 - South Zone (₹2,800/month)' },
              { value: 'route4', label: 'Route 4 - East Zone (₹2,400/month)' },
              { value: 'route5', label: 'Route 5 - West Zone (₹2,600/month)' }
            ]}
          />
        </div>
      )}
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-6 sm:mb-8">
        <div className="flex items-center justify-center sm:justify-start mb-4 sm:mb-0">
          {renderStepIcon(4, <Heart size={18} className="sm:w-5 sm:h-5" />)}
        </div>
        <div className="text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">Medical Information</h2>
          <p className="text-slate-600 dark:text-slate-400 mt-1 text-sm sm:text-base">Help us keep you safe and healthy</p>
        </div>
      </div>
      
      <FormInput
        label="Blood Group"
        type="select"
        value={formData.bloodGroup}
        onChange={(value) => handleInputChange('bloodGroup', value)}
        options={[
          { value: 'A+', label: 'A+' },
          { value: 'A-', label: 'A-' },
          { value: 'B+', label: 'B+' },
          { value: 'B-', label: 'B-' },
          { value: 'AB+', label: 'AB+' },
          { value: 'AB-', label: 'AB-' },
          { value: 'O+', label: 'O+' },
          { value: 'O-', label: 'O-' }
        ]}
        required
      />
      
      <FormInput
        label="Medical Conditions (if any)"
        type="textarea"
        value={formData.medicalConditions}
        onChange={(value) => handleInputChange('medicalConditions', value)}
        placeholder="Please list any chronic conditions, disabilities, or ongoing medical issues"
      />
      
      <FormInput
        label="Current Medications (if any)"
        type="textarea"
        value={formData.medications}
        onChange={(value) => handleInputChange('medications', value)}
        placeholder="List any medications you're currently taking, including dosages"
      />
      
      <FormInput
        label="Family Doctor Contact (Optional)"
        type="tel"
        value={formData.doctorContact}
        onChange={(value) => handleInputChange('doctorContact', value)}
        placeholder="Dr. Name - +1 (555) 123-4567"
      />
    </div>
  );

  const renderCurrentStep = () => {
    switch(currentStep) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      default: return renderStep1();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo transition-colors duration-300 py-2 px-1 sm:py-2 sm:px-4">
      <div className="container mx-auto px-4 py-6">
        {/* Main Form Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 border border-slate-200 dark:border-slate-700">
          {renderProgressBar()}
          
          {/* Mobile Step Indicators */}
          <div className="flex lg:hidden justify-center items-center mb-8">
            <div className="flex items-center space-x-2 sm:space-x-4 overflow-x-auto pb-2">
              <div className="flex items-center space-x-1">
                {renderStepIcon(1, <User size={14} />)}
                <span className={`text-xs font-medium whitespace-nowrap ${
                  currentStep === 1 ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400'
                }`}>
                  Personal
                </span>
              </div>
              <div className="w-4 h-px bg-slate-300 dark:bg-slate-600"></div>
              <div className="flex items-center space-x-1">
                {renderStepIcon(2, <Home size={14} />)}
                <span className={`text-xs font-medium whitespace-nowrap ${
                  currentStep === 2 ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400'
                }`}>
                  Hostel
                </span>
              </div>
              <div className="w-4 h-px bg-slate-300 dark:bg-slate-600"></div>
              <div className="flex items-center space-x-1">
                {renderStepIcon(3, <Car size={14} />)}
                <span className={`text-xs font-medium whitespace-nowrap ${
                  currentStep === 3 ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400'
                }`}>
                  Transport
                </span>
              </div>
              <div className="w-4 h-px bg-slate-300 dark:bg-slate-600"></div>
              <div className="flex items-center space-x-1">
                {renderStepIcon(4, <Heart size={14} />)}
                <span className={`text-xs font-medium whitespace-nowrap ${
                  currentStep === 4 ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400'
                }`}>
                  Medical
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Step Navigation Indicators */}
          <div className="hidden lg:flex justify-center items-center space-x-8 mb-12">
            <div className="flex items-center space-x-3">
              {renderStepIcon(1, <User size={16} />)}
              <span className={`text-sm font-medium transition-colors duration-200 ${
                currentStep === 1 ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400'
              }`}>
                Personal Details
              </span>
            </div>
            <div className="w-8 h-px bg-slate-300 dark:bg-slate-600"></div>
            <div className="flex items-center space-x-3">
              {renderStepIcon(2, <Home size={16} />)}
              <span className={`text-sm font-medium transition-colors duration-200 ${
                currentStep === 2 ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400'
              }`}>
                Hostel Info
              </span>
            </div>
            <div className="w-8 h-px bg-slate-300 dark:bg-slate-600"></div>
            <div className="flex items-center space-x-3">
              {renderStepIcon(3, <Car size={16} />)}
              <span className={`text-sm font-medium transition-colors duration-200 ${
                currentStep === 3 ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400'
              }`}>
                Transportation
              </span>
            </div>
            <div className="w-8 h-px bg-slate-300 dark:bg-slate-600"></div>
            <div className="flex items-center space-x-3">
              {renderStepIcon(4, <Heart size={16} />)}
              <span className={`text-sm font-medium transition-colors duration-200 ${
                currentStep === 4 ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400'
              }`}>
                Medical Info
              </span>
            </div>
          </div>

          {/* Form Content */}
          <div className="mb-6 sm:mb-8">
            {renderCurrentStep()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-col space-y-3 sm:flex-row sm:justify-between sm:items-center sm:space-y-0 border-t border-slate-200 dark:border-slate-700 pt-6 sm:pt-8">
            <button
              onClick={handlePrev}
              disabled={currentStep === 1}
              className={`flex items-center justify-center space-x-2 px-4 sm:px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                currentStep === 1
                  ? 'bg-slate-100 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 hover:scale-105'
              }`}
            >
              <ChevronLeft size={18} />
              <span>Previous</span>
            </button>
            
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
              <button
                onClick={handleSaveProgress}
                disabled={savedProgress}
                className="flex items-center justify-center space-x-2 px-4 sm:px-6 py-3 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-green-700 dark:text-green-300 rounded-xl font-medium hover:from-green-200 hover:to-emerald-200 dark:hover:from-green-900/40 dark:hover:to-emerald-900/40 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {savedProgress ? <Clock size={18} className="animate-spin" /> : <Save size={18} />}
                <span className="text-sm sm:text-base">{savedProgress ? 'Saving...' : 'Save Progress'}</span>
              </button>
              
              {currentStep === totalSteps ? (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex items-center justify-center space-x-2 px-6 sm:px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? <Clock size={18} className="animate-spin" /> : <Send size={18} />}
                  <span className="text-sm sm:text-base">{isSubmitting ? 'Submitting...' : 'Submit Form'}</span>
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="flex items-center justify-center space-x-2 px-6 sm:px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <span className="text-sm sm:text-base">Next Step</span>
                  <ChevronRight size={18} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Success Indicator */}
        {savedProgress && (
          <div className="fixed bottom-4 right-4 left-4 sm:left-auto bg-green-600 text-white px-4 sm:px-6 py-3 rounded-xl shadow-lg animate-slideUp z-50">
            <div className="flex items-center justify-center sm:justify-start space-x-2">
              <CheckCircle size={18} />
              <span className="text-sm sm:text-base">Progress saved successfully!</span>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-6 sm:mt-8 text-xs sm:text-sm text-slate-500 dark:text-slate-400 animate-fadeIn">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-3 sm:p-4 border border-slate-200 dark:border-slate-700">
            <p className="mb-2 text-sm sm:text-base">
              <strong>Need assistance?</strong> Our support team is here to help you complete your onboarding.
            </p>
            <div className="flex flex-col sm:flex-row justify-center sm:space-x-6 space-y-2 sm:space-y-0 text-xs">
              <span className="flex items-center justify-center">📧 <span className="font-medium text-blue-600 dark:text-blue-400 ml-1">admissions@college.edu</span></span>
              <span className="flex items-center justify-center">📞 <span className="font-medium text-blue-600 dark:text-blue-400 ml-1">+1 (555) 123-4567</span></span>
              <span className="flex items-center justify-center">💬 <span className="font-medium text-blue-600 dark:text-blue-400 ml-1">Live Chat Available</span></span>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes slideIn {
          from { 
            opacity: 0; 
            transform: translateX(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateX(0); 
          }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes slideDown {
          from { 
            opacity: 0; 
            transform: translateY(-20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-slideIn {
          animation: slideIn 0.5s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.6s ease-out;
        }
        
        .animate-slideDown {
          animation: slideDown 0.6s ease-out;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default OnboardingForm;
