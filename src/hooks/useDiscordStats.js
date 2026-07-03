import React, { useState, useEffect } from 'react';

const useDiscordStats = (guildId) => {
  const [stats, setStats] = useState({ online: 0, total: 0, loading: true, error: false });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`https://discord.com/api/guilds/${guildId}/widget.json`);
        if (!response.ok) throw new Error('Widget disabled or error');
        const data = await response.json();
        
        // Note: total members is approximate from the presence list if not explicitly provided
        // Some widgets only show presence list. We'll use presence.length as a floor.
        setStats({
          online: data.presence_count || 0,
          total: data.members?.length || 0, // Caution: this is usually only online members in the widget JSON
          loading: false,
          error: false,
          instantInvite: data.instant_invite
        });
      } catch (err) {
        setStats(prev => ({ ...prev, loading: false, error: true }));
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [guildId]);

  return stats;
};

export default useDiscordStats;
