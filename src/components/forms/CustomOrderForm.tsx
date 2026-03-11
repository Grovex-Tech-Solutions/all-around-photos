'use client';

import { useState } from 'react';
import { customOrderSchema } from '@/lib/validations/custom-order';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';

export function CustomOrderForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    description: '',
    style: 'streetwear',
    budget: '100-250',
    timeline: '1-2-weeks',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess(false);

    try {
      // Validate data
      customOrderSchema.parse(formData);

      const response = await fetch('/api/custom-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit order');
      }

      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        description: '',
        style: 'streetwear',
        budget: '100-250',
        timeline: '1-2-weeks',
      });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {error && (
        <div className="rounded-lg bg-red-900 p-4 text-red-100">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-lg bg-green-900 p-4 text-green-100">
          Order request submitted successfully! We'll contact you soon.
        </div>
      )}

      {/* Name */}
      <div>
        <label className="block text-sm font-semibold text-white">
          Full Name *
        </label>
        <Input
          type="text"
          name="name"
          placeholder="John Doe"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-2 bg-slate-700 text-white placeholder-slate-400"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-semibold text-white">
          Email *
        </label>
        <Input
          type="email"
          name="email"
          placeholder="john@example.com"
          value={formData.email}
          onChange={handleChange}
          required
          className="mt-2 bg-slate-700 text-white placeholder-slate-400"
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-semibold text-white">
          Phone Number *
        </label>
        <Input
          type="tel"
          name="phone"
          placeholder="+1 (555) 123-4567"
          value={formData.phone}
          onChange={handleChange}
          required
          className="mt-2 bg-slate-700 text-white placeholder-slate-400"
        />
      </div>

      {/* Style */}
      <div>
        <label className="block text-sm font-semibold text-white">
          Design Style *
        </label>
        <Select
          name="style"
          value={formData.style}
          onChange={handleChange}
          className="mt-2 bg-slate-700 text-white"
        >
          <option value="streetwear">Streetwear</option>
          <option value="classic">Classic</option>
          <option value="artistic">Artistic</option>
          <option value="custom">Custom</option>
        </Select>
      </div>

      {/* Budget */}
      <div>
        <label className="block text-sm font-semibold text-white">
          Budget Range *
        </label>
        <Select
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          className="mt-2 bg-slate-700 text-white"
        >
          <option value="100-250">$100 - $250</option>
          <option value="250-500">$250 - $500</option>
          <option value="500-1000">$500 - $1,000</option>
          <option value="1000+">$1,000+</option>
        </Select>
      </div>

      {/* Timeline */}
      <div>
        <label className="block text-sm font-semibold text-white">
          Timeline *
        </label>
        <Select
          name="timeline"
          value={formData.timeline}
          onChange={handleChange}
          className="mt-2 bg-slate-700 text-white"
        >
          <option value="1-2-weeks">1-2 weeks</option>
          <option value="2-4-weeks">2-4 weeks</option>
          <option value="1-2-months">1-2 months</option>
          <option value="flexible">Flexible</option>
        </Select>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-semibold text-white">
          Order Description *
        </label>
        <Textarea
          placeholder="Describe your custom order in detail..."
          name="description"
          rows={5}
          value={formData.description}
          onChange={handleChange}
          required
          className="mt-2 bg-slate-700 text-white placeholder-slate-400"
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-red-600 py-3 font-bold hover:bg-red-700 disabled:opacity-50"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Order Request'}
      </Button>
    </form>
  );
}
