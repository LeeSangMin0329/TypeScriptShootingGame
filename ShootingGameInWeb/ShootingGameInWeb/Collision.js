var Collision = /** @class */ (function () {
    function Collision() {
    }
    Collision.prototype.CheckPlayerToEnemys = function (player, enemys) {
        for (var i = 0; i < enemys.length; i++) {
            if (enemys[i].IsDead || player.IsDead) {
                continue;
            }
            var check = player.XPos() > enemys[i].XPos() - enemys[i].Height() / 2 &&
                player.XPos() < enemys[i].XPos() + enemys[i].Height() / 2 &&
                player.YPos() > enemys[i].YPos() - enemys[i].Width() / 2 &&
                player.YPos() < enemys[i].YPos() + enemys[i].Width() / 2;
            if (check) {
                player.IsDead = true;
            }
        }
    };
    Collision.prototype.CheckBulletToEnemys = function (bullets, enemys) {
        for (var j = 0; j < bullets.length; j++) {
            for (var i = 0; i < enemys.length; i++) {
                if (bullets[j].IsDead || enemys[i].IsDead) {
                    continue;
                }
                var check = bullets[j].XPos() + bullets[j].Width() / 2 > enemys[i].XPos() &&
                    bullets[j].XPos() + bullets[j].Width() / 2 < enemys[i].XPos() + enemys[i].Width() &&
                    bullets[j].YPos() + bullets[j].Height() / 2 > enemys[i].YPos() &&
                    bullets[j].YPos() + bullets[j].Height() / 2 < enemys[i].YPos() + enemys[i].Height();
                if (check) {
                    bullets[j].IsDead = true;
                    if (enemys[i].Damage(Common.BulletDamage)) {
                        Common.Score += 10;
                    }
                }
            }
        }
    };
    return Collision;
}());
//# sourceMappingURL=Collision.js.map