import React, { useState } from 'react';

function OTPValidationModal({ isOpen, onClose, onValidate }) {
    const [otp, setOtp] = useState('');

    const handleValidate = () => {
        // Call the parent onValidate with the OTP
        onValidate(otp);
    };

    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <h3>OTP Validation</h3>
                <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                />
                <button onClick={handleValidate}>Validate OTP</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
}

export default OTPValidationModal;
