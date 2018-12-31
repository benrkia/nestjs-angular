-- phpMyAdmin SQL Dump
-- version 4.7.2
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le :  lun. 31 déc. 2018 à 05:54
-- Version du serveur :  5.6.35
-- Version de PHP :  7.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Base de données :  `twitter`
--

-- --------------------------------------------------------

--
-- Structure de la table `tweet`
--

CREATE TABLE `tweet` (
  `id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `content` text NOT NULL,
  `creationDate` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `tweet`
--

INSERT INTO `tweet` (`id`, `title`, `content`, `creationDate`, `userId`) VALUES
(1, 'first tweet', 'We cannot abdicate responsibility when two children, ages 7 and 8, die in US custody. The US once said: \"Give me your tired, your poor, your huddled masses yearning to breathe free.\" I have faith in the US to be better than this.', '2018-12-30 00:00:00', 1),
(2, 'second tweet', 'We cannot abdicate responsibility when two children, ages 7 and 8, die in US custody. The US once said: \"Give me your tired, your poor, your huddled masses yearning to breathe free.\" I have faith in the US to be better than this.', '2018-12-30 02:00:00', 1),
(3, 'third tweet', 'Migrating from JDK 8 to JDK 11: what you need to know about Java APIs \r\n\r\n#Java #OpenJDK #JDK11 \r\n\r\nhttp://jugsi.blogspot.com/2018/11/from-java-8-to-java-11-in-single-step.html …', '2018-12-30 05:00:00', 1),
(4, 'forth tweet', 'When collaborating on a web frontend, it\'s important for everyone to actually see the app. Now, sharing localhost servers via Live Share is as easy as starting them from the @code terminal. Simply run \"npm start\", \"flask run\", etc. and guests will automatically get secure access!', '2018-12-30 06:00:00', 1),
(5, 'fifth tweet', 'As the new year approaches, be sure to ✓ off any last minute to-dos. #GoogleSheets can help → https://goo.gl/FbTYc2 ', '2018-12-30 11:00:00', 1),
(6, 'sixth tweet', 'Thirsty for more from Home Alone Again? Go behind the scenes to see how we recreated Kevin McCallister’s home with the Google Assistant. #HeyGoogle', '2018-12-30 16:34:00', 1),
(14, 'test tweet', '<p><strong>new tweet</strong></p><p><a href=\"http://benrkia.com\">link</a></p>', '2018-12-31 03:54:37', 2);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `firstName` varchar(20) NOT NULL,
  `lastName` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` text NOT NULL,
  `avatar` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `firstName`, `lastName`, `email`, `password`, `avatar`) VALUES
(1, 'ilyasse', 'benrkia', 'benrkyailyass@gmail.com', '1234567890', 'https://avatars1.githubusercontent.com/u/31972427?s=460&v=4'),
(2, 'user', 'user', 'user@user.com', '1234567890', 'https://openclipart.org/image/2400px/svg_to_png/211821/matt-icons_preferences-desktop-personal.png');

-- --------------------------------------------------------

--
-- Structure de la table `user_liked_tweets_tweet`
--

CREATE TABLE `user_liked_tweets_tweet` (
  `userId` int(11) NOT NULL,
  `tweetId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `user_liked_tweets_tweet`
--

INSERT INTO `user_liked_tweets_tweet` (`userId`, `tweetId`) VALUES
(2, 4),
(1, 5),
(2, 5),
(1, 6),
(2, 6),
(1, 14),
(2, 14);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `tweet`
--
ALTER TABLE `tweet`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_a9703cf826200a2d155c22eda96` (`userId`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`);

--
-- Index pour la table `user_liked_tweets_tweet`
--
ALTER TABLE `user_liked_tweets_tweet`
  ADD PRIMARY KEY (`userId`,`tweetId`),
  ADD KEY `FK_98f8aa872d21c6f62774cdc1c5f` (`tweetId`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `tweet`
--
ALTER TABLE `tweet`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `tweet`
--
ALTER TABLE `tweet`
  ADD CONSTRAINT `FK_a9703cf826200a2d155c22eda96` FOREIGN KEY (`userId`) REFERENCES `user` (`id`);

--
-- Contraintes pour la table `user_liked_tweets_tweet`
--
ALTER TABLE `user_liked_tweets_tweet`
  ADD CONSTRAINT `FK_0629089124b4a7e4363835e6ba3` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_98f8aa872d21c6f62774cdc1c5f` FOREIGN KEY (`tweetId`) REFERENCES `tweet` (`id`) ON DELETE CASCADE;

