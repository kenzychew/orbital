import { useState } from 'react';
import styles from './KeyboardHelp.module.css';

export const KeyboardHelp = () => {
  const [isOpen, setIsOpen] = useState(false);

  const shortcuts = [
    { key: 'Arrow Keys', description: 'Move camera left/right/up/down' },
    { key: '+ / -', description: 'Zoom in/out' },
    { key: 'R', description: 'Reset camera position' },
    { key: 'Mouse Drag', description: 'Rotate view' },
    { key: 'Mouse Wheel', description: 'Zoom in/out' },
  ];

  return (
    <div className={styles.helpContainer}>
      <button
        className={styles.helpButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Keyboard navigation help"
      >
        <kbd>?</kbd>
      </button>

      {isOpen && (
        <div className={styles.helpPanel}>
          <h3>Keyboard Shortcuts</h3>
          <ul className={styles.shortcutList}>
            {shortcuts.map((shortcut, index) => (
              <li key={index}>
                <kbd>{shortcut.key}</kbd>
                <span>{shortcut.description}</span>
              </li>
            ))}
          </ul>
          <button 
            className={styles.closeButton}
            onClick={() => setIsOpen(false)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default KeyboardHelp; 
