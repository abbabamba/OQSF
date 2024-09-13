import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AlertCircle, Search, Trash2, LogOut, Users, X } from 'lucide-react';
import Swal from 'sweetalert2';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './AdminDashboard.module.css';

const Input = ({ icon: Icon, ...props }) => (
  <div className={styles.inputWrapper}>
    <input {...props} className={styles.input} />
    {Icon && <Icon className={styles.inputIcon} size={18} />}
  </div>
);

const Button = ({ children, variant = "default", ...props }) => {
  const baseClass = styles.button;
  const variantClass = variant === "outline" ? styles.buttonOutline : styles.buttonDefault;
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseClass} ${variantClass}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://backend-oqsf.onrender.com/api/users', {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
      });
      setUsers(response.data);
      setError('');
    } catch (error) {
      setError("Erreur lors de la récupération des utilisateurs");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: "Vous ne pourrez pas revenir en arrière !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer !',
      cancelButtonText: 'Annuler'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`https://backend-oqsf.onrender.com/api/users/${userId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
          });
          setUsers(users.filter(user => user.id !== userId));
          Swal.fire(
            'Supprimé !',
            'L\'utilisateur a été supprimé.',
            'success'
          );
        } catch (error) {
          Swal.fire(
            'Erreur !',
            'Une erreur est survenue lors de la suppression.',
            'error'
          );
        }
      }
    });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const filteredUsers = users.filter(user =>
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = () => {
    Swal.fire({
      title: 'Déconnexion',
      text: "Êtes-vous sûr de vouloir vous déconnecter ?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, me déconnecter',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('adminToken');
        navigate('/login');
      }
    });
  };

  return (
    <div className={styles.dashboardContainer}>
      <nav className={styles.navbar}>
        <div className={styles.navbarContent}>
          <div className={styles.logo}>
            <Users className={styles.logoIcon} />
            <span className={styles.logoText}>Admin Dashboard</span>
          </div>
          <Button onClick={handleLogout} variant="outline" className={styles.logoutButton}>
            <LogOut className="mr-2 h-4 w-4" /> Déconnexion
          </Button>
        </div>
      </nav>

      <main className={styles.mainContent}>
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className={styles.errorMessage}
            >
              <AlertCircle className="inline mr-2" />
              <span>{error}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className={styles.searchContainer}>
          <Search className={styles.searchIcon} size={18} />
          <input
            type="text"
            placeholder="Rechercher un utilisateur..."
            value={searchTerm}
            onChange={handleSearch}
            className={styles.searchInput}
          />
          {searchTerm && (
            <button onClick={clearSearch} className={styles.clearButton}>
              <X size={18} />
            </button>
          )}
          <AnimatePresence>
            {searchTerm && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={styles.searchResults}
              >
                {filteredUsers.length} résultat(s) trouvé(s)
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className={styles.spinner}></div>
          </div>
        ) : (
          <motion.table className={styles.table} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <thead className={styles.tableHeader}>
              <tr>
                <th className={styles.tableHeaderCell}>Prénom</th>
                <th className={styles.tableHeaderCell}>Nom</th>
                <th className={styles.tableHeaderCell}>Email</th>
                <th className={styles.tableHeaderCell}>Téléphone</th>
                <th className={styles.tableHeaderCell}>Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filteredUsers.map((user) => (
                  <motion.tr
                    key={user.id}
                    className={styles.tableRow}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    layout
                  >
                    <td className={styles.tableCell}>{user.firstName}</td>
                    <td className={styles.tableCell}>{user.lastName}</td>
                    <td className={styles.tableCell}>{user.email}</td>
                    <td className={styles.tableCell}>{user.phoneNumber}</td>
                    <td className={styles.tableCell}>
                      <Button className={styles.deleteButton} onClick={() => handleDeleteUser(user.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </motion.table>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
