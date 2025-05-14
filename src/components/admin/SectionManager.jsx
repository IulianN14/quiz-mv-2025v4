import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaEdit, FaArrowUp, FaArrowDown, FaQuestionCircle } from 'react-icons/fa';
import { useAdmin } from '../../context/AdminContext';

function SectionManager() {
  const { sections, loadSections, createSection, updateSectionOrder } = useAdmin();
  const [newSection, setNewSection] = useState({ title: '', description: '' });
  const [editSection, setEditSection] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  useEffect(() => {
    loadSections();
  }, [loadSections]);
  
  const handleAddSection = async (e) => {
    e.preventDefault();
    
    try {
      await createSection({
        ...newSection,
        order: sections.length
      });
      
      setNewSection({ title: '', description: '' });
      setIsAdding(false);
      loadSections();
    } catch (error) {
      console.error('Error creating section:', error);
    }
  };
  
  const handleEditSection = async (e) => {
    e.preventDefault();
    
    try {
      await createSection(editSection); // Folosim aceeași funcție pentru update, doar că cu id existent
      
      setEditSection(null);
      setIsEditing(false);
      loadSections();
    } catch (error) {
      console.error('Error updating section:', error);
    }
  };
  
  const handleMoveSection = async (sectionId, direction) => {
    const sectionIndex = sections.findIndex(s => s.id === sectionId);
    if (
      (direction === 'up' && sectionIndex === 0) || 
      (direction === 'down' && sectionIndex === sections.length - 1)
    ) {
      return;
    }
    
    const newSections = [...sections];
    const temp = newSections[sectionIndex];
    
    if (direction === 'up') {
      newSections[sectionIndex] = newSections[sectionIndex - 1];
      newSections[sectionIndex - 1] = temp;
    } else {
      newSections[sectionIndex] = newSections[sectionIndex + 1];
      newSections[sectionIndex + 1] = temp;
    }
    
    try {
      await updateSectionOrder(newSections);
      loadSections();
    } catch (error) {
      console.error('Error reordering sections:', error);
    }
  };
  
  return (
    <div>
      <div className="quiz-card mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Gestionare Secțiuni</h2>
          
          {!isAdding && (
            <button 
              className="btn btn-primary btn-sm flex items-center"
              onClick={() => setIsAdding(true)}
            >
              <FaPlus className="mr-1" /> Adaugă Secțiune
            </button>
          )}
        </div>
        
        {isAdding && (
          <form onSubmit={handleAddSection} className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-bold mb-3">Adaugă Secțiune Nouă</h3>
            
            <div className="mb-3">
              <label htmlFor="title" className="block text-gray-700 font-medium mb-1">
                Titlu Secțiune *
              </label>
              <input
                type="text"
                id="title"
                className="input"
                value={newSection.title}
                onChange={(e) => setNewSection({...newSection, title: e.target.value})}
                required
              />
            </div>
            
            <div className="mb-3">
              <label htmlFor="description" className="block text-gray-700 font-medium mb-1">
                Descriere
              </label>
              <textarea
                id="description"
                className="input"
                value={newSection.description}
                onChange={(e) => setNewSection({...newSection, description: e.target.value})}
                rows="2"
              />
            </div>
            
            <div className="flex justify-end space-x-2">
              <button 
                type="button" 
                className="btn btn-outline btn-sm"
                onClick={() => setIsAdding(false)}
              >
                Anulează
              </button>
              <button 
                type="submit" 
                className="btn btn-primary btn-sm"
              >
                Salvează Secțiune
              </button>
            </div>
          </form>
        )}
        
        {isEditing && editSection && (
          <form onSubmit={handleEditSection} className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-bold mb-3">Editare Secțiune</h3>
            
            <div className="mb-3">
              <label htmlFor="editTitle" className="block text-gray-700 font-medium mb-1">
                Titlu Secțiune *
              </label>
              <input
                type="text"
                id="editTitle"
                className="input"
                value={editSection.title}
                onChange={(e) => setEditSection({...editSection, title: e.target.value})}
                required
              />
            </div>
            
            <div className="mb-3">
              <label htmlFor="editDescription" className="block text-gray-700 font-medium mb-1">
                Descriere
              </label>
              <textarea
                id="editDescription"
                className="input"
                value={editSection.description}
                onChange={(e) => setEditSection({...editSection, description: e.target.value})}
                rows="2"
              />
            </div>
            
            <div className="flex justify-end space-x-2">
              <button 
                type="button" 
                className="btn btn-outline btn-sm"
                onClick={() => setIsEditing(false)}
              >
                Anulează
              </button>
              <button 
                type="submit" 
                className="btn btn-primary btn-sm"
              >
                Actualizează Secțiune
              </button>
            </div>
          </form>
        )}
        
        {sections.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <FaQuestionCircle className="mx-auto text-gray-400 text-4xl mb-2" />
            <p className="text-gray-500">Nu există secțiuni. Adăugați prima secțiune pentru a începe.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {sections.map((section, index) => (
              <div key={section.id} className="section-card">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold">{section.title}</h3>
                    {section.description && (
                      <p className="text-gray-600 text-sm mt-1">{section.description}</p>
                    )}
                  </div>
                  
                  <div className="flex space-x-2">
                    <button 
                      className="text-gray-500 hover:text-primary p-1"
                      onClick={() => {
                        setEditSection(section);
                        setIsEditing(true);
                      }}
                      title="Editează secțiune"
                    >
                      <FaEdit />
                    </button>
                    
                    <button 
                      className="text-gray-500 hover:text-primary p-1"
                      onClick={() => handleMoveSection(section.id, 'up')}
                      disabled={index === 0}
                      title="Mută sus"
                    >
                      <FaArrowUp className={index === 0 ? 'opacity-30' : ''} />
                    </button>
                    
                    <button 
                      className="text-gray-500 hover:text-primary p-1"
                      onClick={() => handleMoveSection(section.id, 'down')}
                      disabled={index === sections.length - 1}
                      title="Mută jos"
                    >
                      <FaArrowDown className={index === sections.length - 1 ? 'opacity-30' : ''} />
                    </button>
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    {section.questions?.length || 0} întrebări
                  </div>
                  
                  <Link 
                    to={`/admin/dashboard/sections/${section.id}`}
                    className="btn btn-sm btn-outline"
                  >
                    Gestionează Întrebări
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SectionManager;
