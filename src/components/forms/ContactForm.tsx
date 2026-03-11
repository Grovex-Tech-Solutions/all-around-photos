'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { contactSchema, type ContactInput } from '@/lib/validations/contact';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactInput) => {
    setIsSubmitting(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send message');
      }

      setSuccess(true);
      reset();
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="rounded-lg bg-red-900 p-4 text-red-100">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-lg bg-green-900 p-4 text-green-100">
          Message sent successfully! We'll get back to you soon.
        </div>
      )}

      {/* Name */}
      <div>
        <label className="block text-sm font-semibold text-white">
          Full Name *
        </label>
        <Input
          type="text"
          placeholder="John Doe"
          {...register('name')}
          className="mt-2 bg-slate-700 text-white placeholder-slate-400"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-semibold text-white">
          Email *
        </label>
        <Input
          type="email"
          placeholder="john@example.com"
          {...register('email')}
          className="mt-2 bg-slate-700 text-white placeholder-slate-400"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
        )}
      </div>

      {/* Subject */}
      <div>
        <label className="block text-sm font-semibold text-white">
          Subject *
        </label>
        <Input
          type="text"
          placeholder="How can we help?"
          {...register('subject')}
          className="mt-2 bg-slate-700 text-white placeholder-slate-400"
        />
        {errors.subject && (
          <p className="mt-1 text-sm text-red-400">{errors.subject.message}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-semibold text-white">
          Message *
        </label>
        <Textarea
          placeholder="Tell us more about your inquiry..."
          rows={5}
          {...register('message')}
          className="mt-2 bg-slate-700 text-white placeholder-slate-400"
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-red-600 py-3 font-bold hover:bg-red-700 disabled:opacity-50"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
}
