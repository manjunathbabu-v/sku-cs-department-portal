import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

const DataContext = createContext(null);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within a DataProvider');
  return context;
};

export const DataProvider = ({ children }) => {
  const [announcements, setAnnouncements] = useState([]);
  const [jobPosts, setJobPosts] = useState([]);
  const [studyMaterials, setStudyMaterials] = useState([]);
  const [results, setResults] = useState([]);

  const fetchAnnouncements = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/announcements`);
      setAnnouncements(res.data);
    } catch (err) {
      console.error('Failed to fetch announcements:', err);
    }
  };

  const addAnnouncement = async (announcement) => {
    try {
      const res = await axios.post(`${BASE_URL}/announcements`, announcement);
      setAnnouncements(prev => [res.data, ...prev]);
    } catch (err) {
      console.error('Failed to post announcement:', err);
    }
  };

  const fetchJobPosts = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/job-posts`);
      // Add empty comments array since backend may not return it
      const postsWithComments = res.data.map(job => ({ ...job, comments: [] }));
      setJobPosts(postsWithComments);
    } catch (err) {
      console.error('Failed to fetch job posts:', err);
    }
  };

  const addJobPost = async (jobPost) => {
    try {
      const res = await axios.post(`${BASE_URL}/job-posts`, jobPost);
      setJobPosts(prev => [{ ...res.data, comments: [] }, ...prev]);
    } catch (err) {
      console.error('Failed to post job:', err);
    }
  };

  const addComment = (jobPostId, comment) => {
    const newComment = {
      ...comment,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };
    setJobPosts(prev =>
      prev.map(post =>
        post.id === jobPostId
          ? { ...post, comments: [...post.comments, newComment] }
          : post
      )
    );
  };

  const fetchStudyMaterials = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/materials`);
      const materials = res.data.map(m => ({
        ...m,
        date: m.date || new Date().toISOString(),
      }));
      setStudyMaterials(materials);
    } catch (err) {
      console.error('Failed to fetch study materials:', err);
    }
  };

  const addStudyMaterial = async (material) => {
    try {
      const res = await axios.post(`${BASE_URL}/materials`, material);
      const newMaterial = { ...res.data, date: new Date().toISOString() };
      setStudyMaterials(prev => [newMaterial, ...prev]);
    } catch (err) {
      console.error('Failed to upload study material:', err);
    }
  };

  const fetchResults = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/results`);
      const resultsWithDate = res.data.map(r => ({
        ...r,
        date: r.date || new Date().toISOString(),
      }));
      setResults(resultsWithDate);
    } catch (err) {
      console.error('Failed to fetch results:', err);
    }
  };

  const addResult = async (result) => {
    try {
      const res = await axios.post(`${BASE_URL}/results`, result);
      const newResult = { ...res.data, date: new Date().toISOString() };
      setResults(prev => [newResult, ...prev]);
    } catch (err) {
      console.error('Failed to post result:', err);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
    fetchJobPosts();
    fetchStudyMaterials();
    fetchResults();
  }, []);

  return (
    <DataContext.Provider
      value={{
        announcements,
        jobPosts,
        studyMaterials,
        results,
        addAnnouncement,
        addJobPost,
        addStudyMaterial,
        addResult,
        addComment,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
