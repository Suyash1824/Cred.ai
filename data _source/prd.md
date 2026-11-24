# 1. Problem Understanding

### Problem

Banks and fintech lenders receive a large number of credit card applications. Manual review of applications can be slow, inconsistent, and difficult to scale.

### Pain Point

Approving an unsuitable applicant can lead to financial loss and increased risk, while delaying or rejecting a suitable applicant can result in lost business and a poor customer experience.

### Root Cause

A large number of applications require manual verification of customer details. This increases the workload of the bank's verification team, increases processing time, and can make the approval process inefficient.

### Who is Affected

- **Bank verification teams:** Have to manually process and verify a large number of applications.
    
- **Customers:** May experience delays in getting their applications processed and approved.
    

---

# 2. Target Audience

### 1. Primary Users

**Bank Verification / Credit Assessment Team**

### 2. Secondary Users

**Bank Customers / Credit Card Applicants**

### 3. User Needs

**Primary Users – Bank Verification Team**

- Need a system to quickly classify incoming applications based on their predicted risk or approval status.
    
- Need to identify applications that require additional manual verification.
    
- Need relevant applicant information and reasons behind the model's prediction to support their final decision.
    
- Manual verification should primarily focus on applications that require additional attention.
    

**Secondary Users – Bank Customers**

- Need a simple digital application process.
    
- Should be able to submit their details without relying entirely on physical paperwork.
    
- Should receive a smoother and faster application experience.
    
- Should be notified if additional information or correction is required.
    

---

# 3. Assumptions

1. For this MVP, we assume that a significant part of the credit card application process involves manual verification by the bank.
    
2. Customer information may currently be collected through manual or semi-digital processes, which can increase processing time and the possibility of errors.
    
3. The proposed system will provide a digital application interface for customers and a verification dashboard for the bank team.
    
4. The machine learning model will assist the bank's verification team rather than completely replace human decision-making.
    
5. The final approval or rejection decision will remain with the bank verification team.
    

---

# 4. Proposed Solution

Build a digital credit card application and verification system with two user sides:

### Customer Side

Customers can fill out and submit their credit card application digitally. The system can perform basic validation and confirmation before submitting the application.

### Bank Side

The bank verification team receives submitted applications through a dashboard. A machine learning model analyzes the applicant's demographic, financial, and employment attributes and predicts whether the application is likely to be approved or requires further verification.

The system categorizes applications into simplified risk/approval categories and provides relevant applicant information to help the bank team make the final decision.

---

# 5. MVP Scope

## MVP Features

### Customer Side

1. Digital credit card application form.
    
2. Customer enters required personal, financial, and employment details.
    
3. Basic validation of submitted information.
    
4. OTP verification before final submission.
    
5. Application confirmation after successful submission.
    

### Bank Verification Side

1. Dashboard displaying submitted credit card applications.
    
2. Applications are classified using the machine learning model.
    
3. Each application receives a simple status/risk badge, such as:
    
    - **Normal / Likely to Approve**
        
    - **Risky / Requires Verification**
        
4. Bank verification team can view the applicant's submitted details.
    
5. Risky applications are highlighted for additional manual verification.
    
6. The bank team makes the final approval or rejection decision.
    
7. The system should provide relevant information/reasons behind the prediction to support the verification process.
    

---

# 6. Basic MVP User Flow

### Customer Flow

**User → Apply for Credit Card → Fill Application Form → Basic Validation → OTP Verification → Confirm & Submit → Application Sent to Bank**

### Bank Flow

**Application Received → Dashboard → ML Model Analysis → Application Status/Badge →**

**Normal Application → Review Details → Final Approval/Rejection**

**Risky Application → Detailed Review → Manual Verification → Final Approval/Rejection**

---

# 7. MVP Outcome

The MVP aims to reduce the manual workload of the bank verification team by using machine learning to provide an initial classification of credit card applications.

Instead of treating every application equally, the system helps the verification team identify applications that can proceed through the normal review process and applications that require additional attention.

The system **assists human decision-making rather than automatically replacing the bank's verification process.**