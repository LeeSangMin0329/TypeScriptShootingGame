
class Collision {

    public CheckPlayerToEnemys(player: Player, enemys: Enemy[]): void {
        for (var i = 0; i < enemys.length; i++) {

            if (enemys[i].IsDead || player.IsDead) {
                continue;
            }

            var check: boolean =
                player.XPos() > enemys[i].XPos() - enemys[i].Height() / 2 &&
                player.XPos() < enemys[i].XPos() + enemys[i].Height() / 2 &&
                player.YPos() > enemys[i].YPos() - enemys[i].Width() / 2 &&
                player.YPos() < enemys[i].YPos() + enemys[i].Width() / 2;

            if (check) {// collision
                player.IsDead = true;
            }
        }
    }

    public CheckBulletToEnemys(bullets: Bullet[], enemys: Enemy[]): void {
        for (var j = 0; j < bullets.length; j++) {
            for (var i = 0; i < enemys.length; i++) {

                if (bullets[j].IsDead || enemys[i].IsDead) {
                    continue;
                }

                var check: boolean =
                    bullets[j].XPos() + bullets[j].Width() / 2 > enemys[i].XPos() &&
                    bullets[j].XPos() + bullets[j].Width() / 2 < enemys[i].XPos() + enemys[i].Width() &&
                    bullets[j].YPos() + bullets[j].Height() / 2 > enemys[i].YPos() &&
                    bullets[j].YPos() + bullets[j].Height() / 2 < enemys[i].YPos() + enemys[i].Height();

                if (check) {
                    bullets[j].IsDead = true;
                    if (enemys[i].Damage(Common.BulletDamage)) {    // if enemy dead
                        Common.Score += 10;
                    }
                }
            }
        }
    }
}