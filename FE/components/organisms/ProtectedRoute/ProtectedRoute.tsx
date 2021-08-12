  useEffect(() => {
    const path = router.route;
    const requireAuthPath = [
      '/team',
      '/humanpool',
      '/userdetail',
      `/userdetail/${/\d+/}`,
    ];
    const isNotLogIn = !user.id || user.id === 0;
    const isRequireAuthPath = requireAuthPath.some((p) => path.startsWith(p));

    if (isNotLogIn) {
      if (isRequireAuthPath) {
        router.push('/');
      }
    }
  });
