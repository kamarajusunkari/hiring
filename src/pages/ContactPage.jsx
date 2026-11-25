import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Clock, ArrowRight, Check, ShieldCheck } from 'lucide-react';
import { BRAND } from '../data/brandConfig';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim() || formData.name.length < 2) errs.name = 'Please provide your full name.';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) errs.email = 'Valid work email required.';
    if (!formData.subject.trim() || formData.subject.length < 3) errs.subject = 'Please specify a subject.';
    if (!formData.message.trim() || formData.message.length < 10) errs.message = 'Message must be at least 10 characters.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      const existing = JSON.parse(localStorage.getItem('arora_contact_messages') || '[]');
      existing.unshift({
        id: 'MSG-' + Math.floor(100000 + Math.random() * 900000),
        date: new Date().toISOString(),
        ...formData
      });
      localStorage.setItem('arora_contact_messages', JSON.stringify(existing));
      setIsSuccess(true);
    } catch (err) {
      setErrors({ form: 'An error occurred. Please reach us directly at ' + BRAND.contact.email });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Breadcrumbs */}
      <div style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', padding: '12px 0', fontSize: '0.8125rem' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#64748B' }}>
            <Link to="/" style={{ color: '#334155' }}>Home</Link>
            <span>/</span>
            <span style={{ color: '#0F172A', fontWeight: 700 }}>Contact & Inquiries</span>
          </div>
        </div>
      </div>

      <section style={{ padding: 'var(--space-20) 0', background: 'var(--brand-surface)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Get in Touch</span>
            <h1 className="section-title">Talk to Our Solutions Team</h1>
            <p className="section-sub">
              Have an architectural question, need a customized enterprise quote, or want to discuss a dedicated team? We are ready to help.
            </p>
          </div>

          <div className="enquiry-grid" style={{ alignItems: 'stretch' }}>
            {/* Left Contact Card */}
            <div style={{
              background: '#080C16',
              color: '#FFFFFF',
              borderRadius: 24,
              padding: 'clamp(24px, 4vw, 44px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <div className="reassurance-badge">
                  <Clock size={14} />
                  <span>Fast Response Time</span>
                </div>
                <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, color: '#FFFFFF', marginBottom: 16 }}>
                  We typically respond within one business day.
                </h2>
                <p style={{ fontSize: '0.875rem', color: '#94A3B8', lineHeight: 1.6, marginBottom: 32 }}>
                  Whether you need a single specialized developer or a multi-disciplinary squad, our senior engineering coordinators will guide your team.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 32 }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <div style={{ width: 36, height: 36, background: 'rgba(15, 82, 186, 0.2)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#60A5FA', flexShrink: 0 }}>
                      <Mail size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: '#94A3B8', textTransform: 'uppercase', fontWeight: 700 }}>Hiring Desk Email</div>
                      <a href={`mailto:${BRAND.contact.email}`} style={{ fontSize: '1rem', fontWeight: 700, color: '#FFFFFF' }}>{BRAND.contact.email}</a>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <div style={{ width: 36, height: 36, background: 'rgba(15, 82, 186, 0.2)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#60A5FA', flexShrink: 0 }}>
                      <Phone size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: '#94A3B8', textTransform: 'uppercase', fontWeight: 700 }}>Telephone Inquiries</div>
                      <a href={`tel:${BRAND.contact.phoneRaw}`} style={{ fontSize: '1rem', fontWeight: 700, color: '#FFFFFF' }}>{BRAND.contact.phone}</a>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <div style={{ width: 36, height: 36, background: 'rgba(15, 82, 186, 0.2)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#60A5FA', flexShrink: 0 }}>
                      <Clock size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: '#94A3B8', textTransform: 'uppercase', fontWeight: 700 }}>Operating Hours</div>
                      <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#CBD5E1' }}>{BRAND.contact.hours}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 24 }}>
                <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginBottom: 6 }}>Corporate Headquarters:</div>
                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#E2E8F0', lineHeight: 1.5 }}>
                  {BRAND.contact.address}
                </div>
              </div>
            </div>

            {/* Right Contact Form */}
            <div className="enquiry-form-card">
              {!isSuccess ? (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="form-row-2">
                    <div className="form-group">
                      <label className="form-label">Your Name <span className="required-star">*</span></label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="Jane Doe"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                      />
                      {errors.name && <span className="field-error">{errors.name}</span>}
                    </div>
                    <div className="form-group">
                      <label className="form-label">Company / Organization</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="Acme Corp"
                        value={formData.company}
                        onChange={e => setFormData({ ...formData, company: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label className="form-label">Work Email <span className="required-star">*</span></label>
                      <input 
                        type="email" 
                        className="form-input" 
                        placeholder="jane@company.com"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                      />
                      {errors.email && <span className="field-error">{errors.email}</span>}
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone Number</label>
                      <input 
                        type="tel" 
                        className="form-input" 
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Subject / Inquiry Topic <span className="required-star">*</span></label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="e.g. Dedicated React Team staffing for Q1"
                      value={formData.subject}
                      onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    />
                    {errors.subject && <span className="field-error">{errors.subject}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Your Message <span className="required-star">*</span></label>
                    <textarea 
                      className="form-textarea" 
                      rows="4" 
                      placeholder="How can our technical hiring team assist you?"
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                    />
                    {errors.message && <span className="field-error">{errors.message}</span>}
                  </div>

                  <button type="submit" disabled={isSubmitting} className="btn btn-primary btn-block btn-lg">
                    {isSubmitting ? <span className="btn-spinner"></span> : (
                      <>
                        <span>Send Message</span>
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: '0.75rem', color: '#64748B', marginTop: 12 }}>
                    <ShieldCheck size={14} />
                    <span>Your privacy is strictly respected.</span>
                  </div>
                </form>
              ) : (
                <div className="form-success-card">
                  <div className="success-icon-wrap">
                    <Check size={36} strokeWidth={2.5} />
                  </div>
                  <h3 className="success-title">Message Sent Successfully!</h3>
                  <p className="success-desc">
                    Thank you for contacting Arora Tech Solutions. A technical coordinator will reach out to you within one business day.
                  </p>
                  <button type="button" onClick={() => setIsSuccess(false)} className="btn btn-secondary btn-sm">
                    Send Another Message
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
