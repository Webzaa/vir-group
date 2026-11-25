import { useState, useMemo, useRef, useEffect } from 'react';

export const DEPARTMENTS = [
  { name: 'All Departments', key: 'All', icon: 'grid' },
  { name: 'Sales & Marketing', key: 'Sales & Marketing', icon: 'sales' },
  { name: 'Engineering', key: 'Engineering', icon: 'engineering' },
  { name: 'Design', key: 'Design', icon: 'design' },
  { name: 'Projects', key: 'Projects', icon: 'projects' },
  { name: 'Finance & Accounts', key: 'Finance & Accounts', icon: 'finance' },
  { name: 'Human Resources', key: 'Human Resources', icon: 'hr' },
  { name: 'Internships', key: 'Internships', icon: 'internships' },
];

export const POSITIONS = [
  {
    id: 'sales-manager',
    title: 'Senior Sales Manager',
    department: 'Sales & Marketing',
    location: 'Mumbai',
    experience: '5-8 years',
    type: 'Full Time',
    description: 'Lead our sales team and drive revenue growth across residential projects.',
  },
  {
    id: 'marketing-exec',
    title: 'Marketing Executive',
    department: 'Sales & Marketing',
    location: 'Mumbai',
    experience: '2-4 years',
    type: 'Full Time',
    description: 'Create compelling marketing campaigns and manage digital presence.',
  },
  {
    id: 'civil-engineer',
    title: 'Civil Engineer',
    department: 'Engineering',
    location: 'Mumbai',
    experience: '3-6 years',
    type: 'Full Time',
    description: 'Oversee construction projects and ensure quality standards.',
  },
  {
    id: 'interior-designer',
    title: 'Interior Designer',
    department: 'Design',
    location: 'Mumbai',
    experience: '2-5 years',
    type: 'Full Time',
    description: 'Design stunning interiors for residential and commercial spaces.',
  },
  {
    id: 'project-manager',
    title: 'Project Manager',
    department: 'Projects',
    location: 'Mumbai',
    experience: '5-7 years',
    type: 'Full Time',
    description: 'Manage end-to-end project execution and client relationships.',
  },
  {
    id: 'accounts-manager',
    title: 'Accounts Manager',
    department: 'Finance & Accounts',
    location: 'Mumbai',
    experience: '3-5 years',
    type: 'Full Time',
    description: 'Handle financial operations, reporting, and compliance.',
  },
  {
    id: 'hr-executive',
    title: 'HR Executive',
    department: 'Human Resources',
    location: 'Mumbai',
    experience: '2-4 years',
    type: 'Full Time',
    description: 'Manage talent acquisition, employee onboarding, and people culture.',
  },
  {
    id: 'architecture-intern',
    title: 'Architecture Intern',
    department: 'Internships',
    location: 'Mumbai',
    experience: '0-1 years',
    type: 'Internship',
    description: 'Learn from experienced architects and work on live residential projects.',
  },
  {
    id: 'bizdev-exec',
    title: 'Business Development Executive',
    department: 'Sales & Marketing',
    location: 'Mumbai',
    experience: '1-3 years',
    type: 'Full Time',
    description: 'Identify new business opportunities and build client relationships.',
  },
  {
    id: 'site-supervisor',
    title: 'Site Supervisor',
    department: 'Engineering',
    location: 'Mumbai',
    experience: '2-5 years',
    type: 'Full Time',
    description: 'Supervise on-ground construction activities, materials and safety protocol.',
  },
  {
    id: 'planning-engineer',
    title: 'Project Planning Engineer',
    department: 'Projects',
    location: 'Mumbai',
    experience: '3-6 years',
    type: 'Full Time',
    description: 'Coordinate project schedules, material procurement and milestone tracking.',
  },
  {
    id: 'marketing-intern',
    title: 'Digital Marketing Intern',
    department: 'Internships',
    location: 'Mumbai',
    experience: '0-1 years',
    type: 'Internship',
    description: 'Assist with social media campaigns, content creation and brand communications.',
  },
];

function DeptIcon({ type }) {
  switch (type) {
    case 'sales':
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m3 11 18-5v12L3 14v-3z" />
          <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
        </svg>
      );
    case 'engineering':
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      );
    case 'design':
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="m4.93 4.93 4.24 4.24" />
          <path d="m14.83 9.17 4.24-4.24" />
          <path d="m14.83 14.83 4.24 4.24" />
          <path d="m9.17 14.83-4.24 4.24" />
          <circle cx="12" cy="12" r="4" />
        </svg>
      );
    case 'projects':
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      );
    case 'finance':
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <line x1="3" x2="21" y1="9" y2="9" />
          <line x1="9" x2="9" y1="21" y2="9" />
        </svg>
      );
    case 'hr':
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      );
    case 'internships':
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
      );
    default:
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect width="7" height="7" x="3" y="3" rx="1" />
          <rect width="7" height="7" x="14" y="3" rx="1" />
          <rect width="7" height="7" x="14" y="14" rx="1" />
          <rect width="7" height="7" x="3" y="14" rx="1" />
        </svg>
      );
  }
}

export function CareersPositions({ onApplyJob }) {
  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');

  const [deptOpen, setDeptOpen] = useState(false);
  const deptDropRef = useRef(null);

  useEffect(() => {
    if (!deptOpen) return;
    const onDown = (e) => {
      if (deptDropRef.current && !deptDropRef.current.contains(e.target)) {
        setDeptOpen(false);
      }
    };
    const onKey = (e) => {
      if (e.key === 'Escape') setDeptOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('touchstart', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('touchstart', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [deptOpen]);

  const deptCounts = useMemo(() => {
    const counts = { All: POSITIONS.length };
    POSITIONS.forEach((pos) => {
      counts[pos.department] = (counts[pos.department] || 0) + 1;
    });
    return counts;
  }, []);

  const activeDept = DEPARTMENTS.find((d) => d.key === selectedDept) || DEPARTMENTS[0];

  const filteredPositions = useMemo(() => {
    return POSITIONS.filter((pos) => {
      const matchSearch =
        !search.trim() ||
        pos.title.toLowerCase().includes(search.toLowerCase()) ||
        pos.description.toLowerCase().includes(search.toLowerCase()) ||
        pos.department.toLowerCase().includes(search.toLowerCase());
      const matchDept = selectedDept === 'All' || pos.department === selectedDept;
      const matchType = selectedType === 'All' || pos.type.toLowerCase() === selectedType.toLowerCase();
      const matchLoc = selectedLocation === 'All' || pos.location.toLowerCase().includes(selectedLocation.toLowerCase());
      return matchSearch && matchDept && matchType && matchLoc;
    });
  }, [search, selectedDept, selectedType, selectedLocation]);

  return (
    <section className="careers-v2-roles-sec" data-theme="white" id="open-positions" aria-labelledby="open-positions-title">
      <div className="wrap">
        <div className="careers-v2-roles-header">
          <div>
            <span className="careers-v2-micro-tag">OPEN POSITIONS</span>
            <h2 id="open-positions-title" className="careers-v2-sec-title">
              Find Your Perfect Role
            </h2>
          </div>
        </div>

        <div className="careers-v2-filter-bar">
          <div className="careers-v2-search-input-wrap">
            <svg className="careers-v2-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search job title, skills or keywords..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="careers-v2-search-input"
              aria-label="Search job title, skills or keywords"
            />
            {search && (
              <button
                type="button"
                className="careers-v2-search-clear"
                onClick={() => setSearch('')}
              >
                ✕
              </button>
            )}
          </div>

          <div className="careers-v2-selects-group">
            <div className="careers-v2-select-field careers-v2-select-field--dept">
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                aria-label="Filter by department"
              >
                {DEPARTMENTS.map((d) => (
                  <option key={d.key} value={d.key}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="careers-v2-select-field">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                aria-label="Filter by type"
              >
                <option value="All">All Types</option>
                <option value="Full Time">Full Time</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            <div className="careers-v2-select-field">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                aria-label="Filter by location"
              >
                <option value="All">All Locations</option>
                <option value="Mumbai">Mumbai</option>
              </select>
            </div>
          </div>
        </div>

        <div className="careers-v2-layout">
          <aside className="careers-v2-sidebar">
            <div className="careers-v2-dept-list careers-v2-dept-list--desktop">
              {DEPARTMENTS.map((dept) => {
                const isActive = selectedDept === dept.key;
                const count = deptCounts[dept.key] || 0;
                return (
                  <button
                    key={dept.key}
                    type="button"
                    onClick={() => setSelectedDept(dept.key)}
                    className={`careers-v2-dept-item ${isActive ? 'is-active' : ''}`}
                  >
                    <span className="careers-v2-dept-icon">
                      <DeptIcon type={dept.icon} />
                    </span>
                    <span className="careers-v2-dept-name">{dept.name}</span>
                    <span className="careers-v2-dept-badge">{count}</span>
                  </button>
                );
              })}
            </div>

            <div className="careers-v2-dept-dropdown" ref={deptDropRef}>
              <button
                type="button"
                className={`careers-v2-dept-trigger ${deptOpen ? 'is-open' : ''}`}
                onClick={() => setDeptOpen((o) => !o)}
                aria-haspopup="listbox"
                aria-expanded={deptOpen}
              >
                <span className="careers-v2-dept-icon">
                  <DeptIcon type={activeDept.icon} />
                </span>
                <span className="careers-v2-dept-name">{activeDept.name}</span>
                <span className="careers-v2-dept-badge">{deptCounts[activeDept.key] || 0}</span>
                <svg
                  className="careers-v2-dept-chevron"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {deptOpen && (
                <ul className="careers-v2-dept-menu" role="listbox">
                  {DEPARTMENTS.map((dept) => {
                    const isActive = selectedDept === dept.key;
                    return (
                      <li key={dept.key} role="option" aria-selected={isActive}>
                        <button
                          type="button"
                          className={`careers-v2-dept-option ${isActive ? 'is-active' : ''}`}
                          onClick={() => {
                            setSelectedDept(dept.key);
                            setDeptOpen(false);
                          }}
                        >
                          <span className="careers-v2-dept-icon">
                            <DeptIcon type={dept.icon} />
                          </span>
                          <span className="careers-v2-dept-name">{dept.name}</span>
                          <span className="careers-v2-dept-badge">{deptCounts[dept.key] || 0}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </aside>

          <main className="careers-v2-content">
            <div className="careers-v2-results-count">
              Showing <strong>{filteredPositions.length}</strong> of <strong>{POSITIONS.length}</strong> positions
            </div>

            <div className="careers-v2-job-list">
              {filteredPositions.length > 0 ? (
                filteredPositions.map((job) => (
                  <div key={job.id} className="careers-v2-job-card">
                    <div className="careers-v2-job-card-main">
                      <div className="careers-v2-job-left-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
                          <rect width="18" height="18" x="3" y="3" rx="2" />
                          <path d="M3 9h18" />
                          <path d="M9 21V9" />
                        </svg>
                      </div>

                      <div className="careers-v2-job-info">
                        <div className="careers-v2-job-title-row">
                          <h3 className="careers-v2-job-title">{job.title}</h3>
                          <span className="careers-v2-type-pill">{job.type}</span>
                        </div>
                        <div className="careers-v2-job-meta">
                          <span className="careers-v2-meta-tag">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                              <circle cx="12" cy="10" r="3" />
                            </svg>
                            {job.location}
                          </span>
                          <span className="careers-v2-meta-tag">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <circle cx="12" cy="12" r="10" />
                              <polyline points="12 6 12 12 16 14" />
                            </svg>
                            {job.experience}
                          </span>
                        </div>
                        <p className="careers-v2-job-desc">{job.description}</p>
                      </div>
                    </div>

                    <div className="careers-v2-job-btn-wrap">
                      <button type="button" onClick={() => onApplyJob(job)} className="careers-v2-apply-btn">
                        <span>Apply Now</span>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="careers-v2-empty">
                  <p>No positions matching your current search or filters.</p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearch('');
                      setSelectedDept('All');
                      setSelectedType('All');
                      setSelectedLocation('All');
                    }}
                    className="careers-v2-reset-btn"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </section>
  );
}

export default CareersPositions;
