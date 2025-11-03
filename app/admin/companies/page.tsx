'use client';

import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Building2, CheckCircle, XCircle, Mail, Phone, MapPin, Globe, Briefcase } from 'lucide-react';
import Link from 'next/link';

interface Company {
  id: string;
  uid: string;
  email: string;
  name: string;
  companyName: string;
  industry?: string;
  location?: string;
  website?: string;
  phone?: string;
  role: string;
  approved?: boolean;
  createdAt: any;
}

export default function AdminCompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved'>('all');

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('role', '==', 'company'));
      const snapshot = await getDocs(q);
      
      const companiesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Company[];
      
      setCompanies(companiesData);
    } catch (error) {
      console.error('Error fetching companies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (companyId: string, currentStatus: boolean) => {
    try {
      await updateDoc(doc(db, 'users', companyId), {
        approved: !currentStatus
      });
      
      // Refresh list
      fetchCompanies();
      alert(currentStatus ? 'Company access revoked' : 'Company approved!');
    } catch (error) {
      console.error('Error updating company:', error);
      alert('Failed to update company status');
    }
  };

  const filteredCompanies = companies.filter(company => {
    if (filter === 'pending') return !company.approved;
    if (filter === 'approved') return company.approved;
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-black text-white shadow-sm py-6 mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Company Management</h1>
              <p className="text-gray-300 text-sm">Review and approve company registrations</p>
            </div>
            <Link href="/admin" className="text-white hover:text-red-500 transition-colors">
              ← Back to Admin
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Companies</p>
                <p className="text-3xl font-bold text-gray-900">{companies.length}</p>
              </div>
              <Building2 className="text-gray-400" size={40} />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Approved</p>
                <p className="text-3xl font-bold text-green-600">
                  {companies.filter(c => c.approved).length}
                </p>
              </div>
              <CheckCircle className="text-green-400" size={40} />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Pending Approval</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {companies.filter(c => !c.approved).length}
                </p>
              </div>
              <XCircle className="text-yellow-400" size={40} />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
          <div className="flex space-x-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                filter === 'all' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All ({companies.length})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                filter === 'pending' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Pending ({companies.filter(c => !c.approved).length})
            </button>
            <button
              onClick={() => setFilter('approved')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                filter === 'approved' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Approved ({companies.filter(c => c.approved).length})
            </button>
          </div>
        </div>

        {/* Companies List */}
        <div className="space-y-4">
          {filteredCompanies.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center">
              <Building2 className="text-gray-300 mx-auto mb-4" size={64} />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No companies found</h3>
              <p className="text-gray-600">
                {filter === 'pending' && 'All companies have been approved.'}
                {filter === 'approved' && 'No approved companies yet.'}
                {filter === 'all' && 'No companies have registered yet.'}
              </p>
            </div>
          ) : (
            filteredCompanies.map(company => (
              <div key={company.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                        <Building2 className="text-red-600" size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{company.companyName}</h3>
                        <p className="text-sm text-gray-600">Contact: {company.name}</p>
                      </div>
                      {company.approved ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
                          <CheckCircle size={16} className="mr-1" />
                          Approved
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm font-semibold">
                          <XCircle size={16} className="mr-1" />
                          Pending
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center space-x-2 text-gray-700">
                        <Mail size={16} className="text-gray-400" />
                        <span className="text-sm">{company.email}</span>
                      </div>
                      
                      {company.phone && (
                        <div className="flex items-center space-x-2 text-gray-700">
                          <Phone size={16} className="text-gray-400" />
                          <span className="text-sm">{company.phone}</span>
                        </div>
                      )}

                      {company.industry && (
                        <div className="flex items-center space-x-2 text-gray-700">
                          <Briefcase size={16} className="text-gray-400" />
                          <span className="text-sm">{company.industry}</span>
                        </div>
                      )}

                      {company.location && (
                        <div className="flex items-center space-x-2 text-gray-700">
                          <MapPin size={16} className="text-gray-400" />
                          <span className="text-sm">{company.location}</span>
                        </div>
                      )}

                      {company.website && (
                        <div className="flex items-center space-x-2 text-gray-700">
                          <Globe size={16} className="text-gray-400" />
                          <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-sm text-red-600 hover:underline">
                            {company.website}
                          </a>
                        </div>
                      )}
                    </div>

                    <div className="text-xs text-gray-500">
                      Registered: {company.createdAt?.toDate?.()?.toLocaleDateString() || 'N/A'}
                    </div>
                  </div>

                  <div>
                    <button
                      onClick={() => handleApprove(company.id, company.approved || false)}
                      className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                        company.approved
                          ? 'bg-red-100 text-red-700 hover:bg-red-200'
                          : 'bg-green-600 text-white hover:bg-green-700'
                      }`}
                    >
                      {company.approved ? 'Revoke Access' : 'Approve Company'}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
